import { useForm } from "react-hook-form";
import { useLobbyContext } from "@/contexts/LobbyContext/LobbyContext";
import { getPlayerName } from "@/redux/user/utils";
import CustomInput from "@/components/CustomInput/CustomInput";
import Text from "../Text/Text";
import { Container, ChatWindow } from "./Chat.styled";

const Chat = ({ action }) => {
  const { lobby, sendMessage } = useLobbyContext();
  const player_name = getPlayerName();
  const {
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const handleMessage = () => {
    sendMessage({ action, player_name, chat_name: lobby.name, message: watch("message") });
    reset();
  };

  return (
    <Container>
      <ChatWindow>
        {lobby?.chat.map(({ message, author }, index) => (
          <Text key={index} color="primary" fontWeight="regular" fontSize="microSmall">{`${author}: ${message}`}</Text>
        ))}
      </ChatWindow>
      <CustomInput
        control={control}
        errors={errors}
        name="message"
        rules={{ maxLength: 30 }}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            handleMessage();
          }
        }}
        placeholder="Ingresa un mensaje..."
      />
    </Container>
  );
};

export default Chat;
