import { Select, InputText, Button, AvatarCard, Tag, Divider, ButtonIcon} from "../ui-kit/index.ts"
import { doctors, staff } from "./data";
import React from "react";

export default function Team() {
  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-3xl font-medium text-left">My Team</h1>
      </div>

      <div className="flex flex-col w-full gap-3 items-start">
        <h1
          className="text-base font-semibold text-left"
          style={{ whiteSpace: "pre-wrap" }}
        >
          Invite your team
        </h1>
        <div className="flex flex-row w-full gap-4 items-start">
          <InputText
            width="full"
            placeholder="email@example.com"
            hasOutline
            bgColor="base-0"
          />
          <Select
            placeholder="Select role"
            options={[
              { label: "Doctor", value: "doctor" },
              { label: "Nurse", value: "nurse" },
              { label: "Staff", value: "staff" },
            ]}
            hasOutline
            bgColor="base-0"
          />
          <Button text="Invite" color="primary" size="medium" style="filled" />
        </div>
      </div>

      {/* Doctors Table */}
      <div className="flex flex-col w-full gap-3 items-start">
        <h1 className="text-base font-semibold text-left" style={{ whiteSpace: "pre-wrap" }}>
          Doctors
        </h1>
        {Object.values(doctors).map((doctor, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-row w-full items-center justify-between gap-3">
              <div className="flex flex-row items-start gap-3">
                <AvatarCard
                  name={doctor.name}
                  type="image"
                  imageSize="28px"
                  imageColor="accent"
                  imagePosition="left"
                  secondaryText={doctor.category}
                  imageSrc={doctor.image}
                />
              </div>
              <div className="flex flex-row items-center gap-4 justify-end">
                {doctor.isOwner && (
                  <Tag size="small" text="Admin" type="light" color="success" />
                )}
                <ButtonIcon size="small" icon="edit" style="ghost" />
                <Select
                  size="small"
                  value="doctor"
                  placeholder="Select role"
                  options={[
                    { label: "Doctor", value: "doctor" },
                    { label: "Nurse", value: "nurse" },
                    { label: "Staff", value: "staff" },
                  ]}
                />
              </div>
            </div>
            <Divider color="base-100" length="full" direction="horizontal" thickness="1px" />
          </React.Fragment>
        ))}
      </div>


      {/* Staff Table */}
      <div className="flex flex-col w-full gap-3 items-start">
        <h1 className="text-base font-semibold text-left" style={{ whiteSpace: "pre-wrap" }}>
          Staff
        </h1>
        
        {Object.entries(staff).map(([category, members], index) => (
          <React.Fragment key={index}>
            <h2 className="text-sm font-medium text-left capitalize">
              {category}
            </h2>
            {Object.values(members).map((member) => (
              <div key={member.name} className="flex flex-row w-full items-center justify-between gap-3">
                {/* Member Info */}
                <div className="flex flex-row items-start gap-3">
                  <AvatarCard
                    name={member.name}
                    type="image"
                    imageSize="28px"
                    imageColor="accent"
                    imagePosition="left"
                    secondaryText={member.department || member.role}
                    imageSrc={member.image}
                  />
                </div>
                {/* Actions */}
                <div className="flex flex-row items-center gap-4 justify-end">
                  {member.isOwner && (
                    <Tag size="small" text="Admin" type="light" color="success" />
                  )}
                  <ButtonIcon size="small" icon="edit" style="ghost" />
                  <Select
                    size="small"
                    value={category}
                    placeholder="Select role"
                    options={[
                      { label: "Doctor", value: "doctor" },
                      { label: "Nurse", value: "nurse" },
                      { label: "Staff", value: "staff" },
                    ]}
                  />
                </div>
              </div>
            ))}
            <Divider color="base-100" length="full" direction="horizontal" thickness="1px" />
          </React.Fragment>
        ))}
      </div>
    </>
  );
}