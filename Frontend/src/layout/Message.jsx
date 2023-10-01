import {
  CloseOutlined,
  ModeCommentOutlined,
  OpenInNew,
  SendOutlined,
  SmartToyOutlined,
} from "@mui/icons-material";
import {
  Avatar,
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
import { useLocation, useNavigate } from "react-router-dom";
import { useMessageContext } from "../contexts/MesageContext";

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
  const { messages, setMessages } = useMessageContext();
  const [open, setOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [reqBody, setReqBody] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      setUserMessage("");
      const requests = populatReqBody();
      generateResponse(requests);
    } else {
      const reqbody = reqBody.concat(userMessage.split(","));

      setReqBody(reqbody);

      setTimeout(() => {
        set("Do you want to add more Symptoms ?");
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
  const generateResponse = (requests) => {
    console.log(requests);
    const API_URL = "https://web-production-e9890.up.railway.app/prediction";
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requests),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        setLoading(false);
        console.log("Response data:", responseData);
        set(responseData);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Fetch error:", error);
        setMessages([
          ...messages,
          {
            message:
              "Opps Something went wrong or I don't have knowledge about your syndrome. Please give symptoms properly.",
            type: "incoming",
          },
        ]);
      });
  };

  function populatReqBody() {
    let requests = {};
    for (let i = 0; i < 17; i++) {
      if (!reqBody[i]) {
        requests[`Symptom_${i + 1}`] = "";
      } else {
        requests[`Symptom_${i + 1}`] = reqBody[i];
      }
    }
    return requests;
  }

  useEffect(() => {
    // When messages change, scroll to the end of the chat
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);
  const location = useLocation();

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
            <Stack direction="row" spacing={2}>
              <IconButton
                onClick={() => {
                  navigate("/chat");
                }}
              >
                <OpenInNew sx={{ transform: "scaleX(-1)" }} />
              </IconButton>
              <IconButton onClick={() => setOpen(!open)}>
                <CloseOutlined />
              </IconButton>
            </Stack>
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
                  {message.type === "self" && (
                    <IconButton sx={{ bgcolor: "Background.default" }}>
                      <Avatar>
                        <img
                          src={
                            localStorage.getItem("image") ??
                            "https://www.w3schools.com/howto/img_avatar.png"
                          }
                          border="0"
                          width="40px"
                          height="40px"
                        />
                      </Avatar>
                    </IconButton>
                  )}
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
              placeholder="Enter symptom here....."
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
