/// <reference path="../pb_data/types.d.ts" />

routerAdd('POST', '/api/hupost/otp', (c) => {
  const data = $apis.requestInfo(c).data;
  const email = data.email?.trim();
  if (!email || !email.includes('@')) {
    return c.json(400, {message: "Invalid email."});
  }
  const code = $security.pseudorandomString(23);
  const dao = $app.dao();
  const collection = dao.findCollectionByNameOrId('otp');
  const record = new Record(collection, { email, code });
  dao.saveRecord(record);
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName,
    },
    to: [{ address: email }],
    subject: "Your magic link for accessing HU post",
    text: `
      Please open this link in your browser to log in:
      https://hupost.com/otp?code=${code}&email=${email}\n
      The link is valid only for 5 minutes.
      If you didn't request this, please ignore this email.
    `,
  })
  $app.newMailClient().send(message);
  return c.string(200, `code sent to ${email}`);
});

routerAdd('POST', '/api/hupost/otp_verify', (c) => {
  const data = $apis.requestInfo(c).data;
  const { code, email } = data;
  if (!code || !email) {
    return c.string(400, `${email} ${code} not found`);
  }

  const dao = $app.dao();
  try {

    const record = (() => {
      const record = new Record();
      $app.dao().recordQuery("otp")
        .andWhere($dbx.hashExp({ "email": email }))
        .orderBy("created DESC")
        .limit(1)
        .one(record)
      return record
    })();
    const storedCode = record.getString("code")
    console.log('GOT ', storedCode);
    console.log('HAS ', code);
    if (storedCode !== code) {
      return c.string(400, `${code} not found`);
    }

    const created = record.created.time().unixMilli();
    const now = Date.now()
    if (now - created > 1800000) {
      return c.string(400, `${code} expired`);
    }
  } catch (e) {
    console.error(`Error confirming otp: ${e}`);
    return c.string(400, `error confirming otp: ${code}`);
  }

  const userRecord = (() => {
    try {
      return dao.findFirstRecordByData('users', 'email', email);
    } catch (e) {
      console.log(`NO USER WITH ${email}. CREATING NEW`);
    }
    try {
      const usersCollection = dao.findCollectionByNameOrId('users');
      const user = new Record(usersCollection);
      user.set('username', dao.suggestUniqueAuthRecordUsername('users', 'user'));
      user.set('email', email);
      user.setPassword($security.randomString(20));
      dao.saveRecord(user);
      return dao.findFirstRecordByData('users', 'email', email);
    } catch (e) {
      console.error(e);
      return null;
    }
  })();

  if (!userRecord) {
    return c.string(400, 'no record created');
  }

  return $apis.recordAuthResponse($app, c, userRecord);
});

routerAdd('POST', '/api/hupost/message/:listingId', (c) => {
  const currentSession = c.get("authRecord");
  const listingId = c.pathParam("listingId");
  const data = $apis.requestInfo(c).data;
  const message = data.message;
  if (!message) {
    return c.noContent(400);
  };
  
  const dao = $app.dao();
  const listing = dao.findRecordById("listings", listingId);
  const title = listing.getString('title');
  const sellerRecord = dao.findRecordById("users", listing.get('posted_by'));
  const buyerEmail = currentSession.get('email');
  const sellerEmail = sellerRecord.get('email');
  const email = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName,
    },
    to: [{ address: sellerEmail }],
    cc: [{ address: buyerEmail }],
    subject: `Message from ${buyerEmail} re: '${title}'`,
    text: `${message}
    Listing URL: https://hupost.com/listing/${listingId}
    `,
  })
  $app.newMailClient().send(email);
  return c.noContent(200);
}, $apis.requireRecordAuth());

routerAdd('POST', '/api/hupost/stripe/:id', async (c) => {
  const id = c.pathParam("id");
  if (!id) {
    return c.noContent(400);
  }

  const Base64 = {
      _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      // public method for encoding
      encode: function (input) {
          let output = ''
          let chr1, chr2, chr3, enc1, enc2, enc3, enc4
          let i = 0

          input = Base64._utf8_encode(input)

          while (i < input.length) {
              chr1 = input.charCodeAt(i++)
              chr2 = input.charCodeAt(i++)
              chr3 = input.charCodeAt(i++)

              enc1 = chr1 >> 2
              enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
              enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
              enc4 = chr3 & 63

              if (isNaN(chr2)) {
                  enc3 = enc4 = 64
              } else if (isNaN(chr3)) {
                  enc4 = 64
              }

              output = output +
               this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
               this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)
          }

          return output
      },

      // private method for UTF-8 encoding
      _utf8_encode: function (string) {
          string = string.replace(/\r\n/g, '\n')
          let utftext = ''

          for (let n = 0; n < string.length; n++) {
              const c = string.charCodeAt(n)

              if (c < 128) {
                  utftext += String.fromCharCode(c)
              } else if ((c > 127) && (c < 2048)) {
                  utftext += String.fromCharCode((c >> 6) | 192)
                  utftext += String.fromCharCode((c & 63) | 128)
              } else {
                  utftext += String.fromCharCode((c >> 12) | 224)
                  utftext += String.fromCharCode(((c >> 6) & 63) | 128)
                  utftext += String.fromCharCode((c & 63) | 128)
              }
          }

          return utftext
      }
  }
  const res = $http.send({
    url: `https://api.stripe.com/v1/checkout/sessions/${id}`,
    method: "GET",
    headers: {
      "Authorization": `Basic ${Base64.encode(process.env.STRIPE_KEY + ':')}`
    },
    timeout: 120
  });
  console.log('--- STRIPE RESPONSE ', id, res.statusCode);
  const stripeResponse = res.json;
  const listingId = stripeResponse.client_reference_id;
  console.log('--- PROCESSING ', listingId);
  const dao = $app.dao();
  const listing = dao.findRecordById("listings", listingId);
  listing.set("published", new Date().toISOString())
  dao.saveRecord(listing);
  console.log('--- UPDATED ', listingId);
  
  const payments = dao.findCollectionByNameOrId('payments');
  const payment = new Record(payments, {
    listing: listingId,
    stripePaymentId: stripeResponse.id,
    amount: stripeResponse.amount_total
  });
  dao.saveRecord(payment);  
  console.log('--- CREATED PAYMENT ', listingId, stripeResponse.id, stripeResponse.amount_total);
  return c.noContent(200);  
});
