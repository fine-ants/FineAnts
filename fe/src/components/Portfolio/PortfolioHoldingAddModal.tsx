import BaseModal from "@components/BaseModal";
import SearchBar from "@components/SearchBar";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PortfolioHoldingAddModal({ isOpen, onClose }: Props) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <>
        <div>모달</div>
        <SearchBar />
      </>
    </BaseModal>
  );
}
