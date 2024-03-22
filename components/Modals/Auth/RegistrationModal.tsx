// SimpleModal.js
import { ModalWrapper } from "../../../ui";
import AuthOptions from "./AuthOptions";
import CreateAccountModal from "./CreateAccount";
import { UserAuth } from "../../../context/AuthContext";

interface RegisterModalProps {
  show: boolean;
}

const RegistrationModal: React.FC<RegisterModalProps> = ({ show }) => {
  const { handleCloseAuthModal, handleCloseCreateAccount, showCreateAccount } =
    UserAuth();

  const closeAuth = () => {
    if (!showCreateAccount) {
      handleCloseCreateAccount();
      handleCloseAuthModal();
    }
  };

  if (!show) return null;
  return (
    <ModalWrapper onClose={closeAuth}>
      {showCreateAccount ? (
        <CreateAccountModal onClose={handleCloseCreateAccount} />
      ) : (
        <AuthOptions onClose={handleCloseAuthModal} />
      )}
    </ModalWrapper>
  );
};

export default RegistrationModal;
