import AddFolderModal from '@/components/AddFolderModal';
import AddLinkModal from './AddLinkModal';
import DeleteFolderModal from './DeleteFolderModal';
import DeleteLinkModal from './DeleteLinkModal';
import EditModal from './EditModal';
import ShareModal from './ShareModal';

interface ModalDataProps {
  selectModal: string;
  handleCloseModal: () => void;
  selectFolder: number | null;
  folderInfo: any[];
  linksInfo: any;
}

export const ModalData: React.FC<ModalDataProps> = ({
  selectModal,
  handleCloseModal,
  selectFolder,
  folderInfo,
  linksInfo,
}) => {
  switch (selectModal) {
    case 'AddLinkModal':
      return (
        <AddLinkModal onClose={handleCloseModal} folderInfo={folderInfo} />
      );
    case 'AddFolderModal':
      return <AddFolderModal onClose={handleCloseModal} />;
    case 'DeleteFolderModal':
      return <DeleteFolderModal onClose={handleCloseModal} />;
    case 'DeleteLinkModal':
      return (
        <DeleteLinkModal onClose={handleCloseModal} linksInfo={linksInfo} />
      );
    case 'EditModal':
      return <EditModal onClose={handleCloseModal} />;
    case 'ShareModal':
      return (
        <ShareModal onClose={handleCloseModal} selectFolder={selectFolder} />
      );
    default:
      return null;
  }
};
