import {
  ConfirmationModal,
  useConfirmationModalData,
} from "@deepchain-labs/ui-common";

export function MyComp() {
  const modalConfig = useConfirmationModalData({
    onConfirm: () => new Promise((resolve) => setTimeout(resolve, 3000)),
    titleText: "Are you sure?",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
  });
  return (
    <div>
      <button
        className="bg-blue-600 text-white p-1"
        onClick={modalConfig.showModal}
      >
        Confirm
      </button>
      <ConfirmationModal modalConfig={modalConfig} />
    </div>
  );
}
