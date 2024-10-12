type NotFoundProps = {
    __juno?: any
}

export default function NotFound({
    __juno = {}
}: NotFoundProps) {

    const { self, junoAttributes, outlineStyle} = __juno;
    let classes = `flex flex-row gap-1 bg-accent-100 text-primary rounded px-2 py-1 self-start`;
    classes += ` ${outlineStyle}`;
    return (
        <div className={classes} {...junoAttributes}>
            {self?.componentAPIName} not found
        </div>
    );
}

NotFound.definitions = {
    apiName: 'NotFound',
    displayName: 'Not Found',
    description: 'used in Juno UI to mark error',
    ai_instructions: 'used in Juno UI to mark error', // is not passed to ai, but probably should be
    propDefinitions: {}
}