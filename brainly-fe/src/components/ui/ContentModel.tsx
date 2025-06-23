import { CrossIcon } from "../../icons/CrossIcon";

interface ContentModelProps {
    open : boolean,
    onClose : () => void
}

export function ContentModel(props: ContentModelProps) {
    const { open, onClose } = props

    return(
        <div>
            {open && <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-70 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded">
                        <div className="flex justify-end" onClick={onClose}>
                            <CrossIcon size="lg" />
                        </div>
                    </span>

                </div>

            </div>}
        </div>
    )
}