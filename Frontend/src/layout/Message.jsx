import {
  CloseOutlined,
  ModeCommentOutlined,
  SendOutlined,
  SmartToyOutlined,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import React, { useEffect, useRef, useState } from "react";

const ChatToggleButton = styled("div")`
  position: fixed;
  right: 40px;
  bottom: 40px;
  height: 50px;
  width: 50px;
  color: #fff;
  border: none;
  display: flex;
  padding: 3vh;
  align-items: center;
  justify-content: center;
  outline: none;
  background: #724ae8;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #340ab4;
  }

  ${({ open }) =>
    open &&
    `
    transform: rotate(90deg);
  `}
`;

const Message = () => {
  const [open, setOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [reqBody, setReqBody] = useState({});
  const [messages, setMessages] = useState([
    {
      message: "Hi there, please provide the symptoms for predicting diesease.",
      type: "incoming",
    },
  ]);
  const scrollContainerRef = useRef(null);

  const small = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleSend = () => {
    if (!userMessage) return;
    console.log(userMessage);
    setMessages([...messages, { message: userMessage, type: "self" }]);

    const msg = userMessage.trim().toLowerCase();

    if (["ok", "thank you"].includes(msg.toLowerCase())) {
      setMessages([
        ...messages,
        {
          message: " You are welcome and Take care yourself",
          type: "incoming",
        },
      ]);
      // sendChatbox.scrollTo(0, sendChatbox.scrollHeight);
      return;
    }

    if (msg.toLowerCase() === "no") {
      populatReqBody();
      generateResponse();
    } else {
      setReqBody({
        ...reqBody,
        [`Symptom_${Object.keys(reqBody).length + 1}`]: userMessage,
      });

      setTimeout(() => {
        set("Do you want to add more Symptomps ?");
      }, 600);
    }
    setUserMessage("");
  };
  const set = (recievedMessage) => {
    setMessages((messages) => [
      ...messages,
      {
        message: recievedMessage,
        type: "incoming",
      },
    ]);
  };
  const generateResponse = () => {
    const API_URL = "https://web-production-34f4.up.railway.app/prediction";
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Response data:", responseData);
        set(responseData);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setMessages([
          ...messages,
          {
            message:
              "Opps Something went wrong or I dont have knowledge about your syndrome. My Boss Ashik will make me able to learn a lot in sha allah",
            type: "incoming",
          },
        ]);
      });
  };

  function populatReqBody() {
    for (let i = 1; i <= 17; i++) {
      if (!reqBody[`Symptom_${i}`]) {
        reqBody[`Symptom_${i}`] = "";
      }
    }
  }

  useEffect(() => {
    // When messages change, scroll to the end of the chat
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <ChatToggleButton
        variant="contained"
        color="primary"
        open={open}
        sx={{ position: "fixed", bottom: 35, right: 35 }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {!open ? <ModeCommentOutlined /> : <CloseOutlined />}
      </ChatToggleButton>
      {open && (
        <Paper
          elevation={24}
          sx={{
            borderRadius: "20px",
            position: "fixed",
            bottom: 100,
            right: 35,
            width: small ? "85%" : "30%",
            height: "75%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            bgcolor="Highlight"
            direction="row"
            justifyContent="space-between"
            borderRadius={"20px 20px 0px 0px"}
            p={2}
          >
            <Typography variant="body2" color={"primary.light"} fontSize={23}>
              HealthGPT
            </Typography>

            <IconButton onClick={() => setOpen(!open)}>
              <CloseOutlined />
            </IconButton>
          </Stack>
          <List
            ref={scrollContainerRef}
            p={1}
            sx={{
              flexGrow: 1,
              overflow: "auto",
            }}
          >
            {messages.map((message, index) => (
              <ListItem key={index} sx={{ display: "flex" }}>
                <Stack
                  direction="row"
                  justifyContent={
                    message.type === "self" ? "flex-end" : "flex-start"
                  }
                  alignItems="flex-start"
                  sx={{ width: "100%" }}
                >
                  {message.type !== "self" && (
                    <IconButton sx={{ bgcolor: "Background.default" }}>
                      <SmartToyOutlined />
                    </IconButton>
                  )}
                  <Stack
                    p={1.5}
                    sx={{
                      maxWidth: "70%",

                      borderRadius:
                        message.type === "self"
                          ? "20px 0px 20px 20px"
                          : "0px 20px 20px 20px",
                      bgcolor:
                        message.type === "self"
                          ? "primary.main"
                          : "background.paper",
                    }}
                    direction="row"
                  >
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{
                        color:
                          message.type === "self"
                            ? "primary.light"
                            : "textDark",
                      }}
                    >
                      {message.message}
                    </Typography>
                  </Stack>
                </Stack>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              borderTop: "1px solid #ddd",
            }}
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <TextField
              fullWidth
              placeholder="Enter symptomp here....."
              required
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <Button id="send-btn" type="submit" color="primary">
              <SendOutlined fontSize="large" />
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default Message;
