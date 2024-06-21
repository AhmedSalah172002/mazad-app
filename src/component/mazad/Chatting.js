import React, { useState, useEffect } from "react";
import sendIcon from "../../images/bid-icon.png";
import io from "socket.io-client";
import AddMazadHook from "../../hook/products/AddMazadHook";
import notify from "../../hook/useNotifaction";
import { ToastContainer } from "react-toastify";
import { Box, Button, Typography } from "@mui/material";
import AddCartHook from "../../hook/cart/AddCartHook";
import { useNavigate } from "react-router-dom";

const Chatting = ({ item }) => {
  const [onSubmit] = AddMazadHook(item._id);
  const [addToCartHandel] = AddCartHook(item._id);
  const navigate = useNavigate();
  let auth;
  if (localStorage.getItem("user") !== null) {
    auth = JSON.parse(localStorage.getItem("user"));
  }
  useEffect(() => {
    if (
      (item?.status !== "start-now" ||
        !item?.involved?.some((e) => e.user === auth._id)) &&
      Object.keys(item).length > 0
    ) {
      navigate("/");
    }
  }, [item, item?.status]);

  useEffect(()=>{
    setTimeLeft(
      calculateTime(
        item?.date,
        item?.status === "not-started" ? item?.startTime : item?.endTime
      )
    );
  },[item])

  // time

  const calculateTime = (date, time) => {
    const difference =
      new Date(`${date?.split("T")[0]}T${time}:00+03:00`) - new Date();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return difference > 0
      ? { days, hours, minutes, seconds }
      : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTime(
      item?.date,
      item?.status === "not-started" ? item?.startTime : item?.endTime
    )
  );

  const socket = io.connect("http://127.0.0.1:9000");
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageColors, setMessageColors] = useState([]);

  const changeColor = (userId) => {
    const hash = userId
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const color = `hsl(${hash % 360}, 70%, 50%)`;
    return color;
  };

  useEffect(() => {
    if (item.mazad?.length >= 1 && !messageColors.length) {
      const colors = item.mazad.map((mazad) => changeColor(mazad.user._id));
      setMessageColors(colors);
    }
  }, [item?.mazad, messageColors]);

  useEffect(() => {
    socket.emit("Join_Room", item._id);

    const handleReceiveMessage = (messageData) => {
      createMessage(messageData.value, messageData.userId, messageData.name);
    };

    socket.on("Recieve_Mazad", handleReceiveMessage);

    return () => {
      socket.off("Recieve_Mazad", handleReceiveMessage);
      socket.disconnect();
    };
  }, [socket, item._id, messages]);

  const sendValue = async (val) => {
    const lastMazadPrice = item.mazad[item.mazad.length - 1]?.price || 0;
    const lastMessage = messages[messages.length - 1]?.price || 0;
    const lastMessageMazadUserId =
      item.mazad[item.mazad.length - 1]?.user?._id || null;
    const lastMessageUserId = messages[messages.length - 1]?.userId || null;
    if (
      lastMessageUserId === auth?._id ||
      (lastMessageMazadUserId === auth?._id && messages.length === 0)
    ) {
      notify("لا يمكنك إرسال رسالة متتالية", "warn");
      return;
    }
    const condition =
      Number(val) >= (Number(lastMessage  > 0 ? lastMessage: item.initialPrice) + item.lowestBidValue || 0);

    if (
      val !== "" &&
      (+val >= (lastMazadPrice > 0 ? lastMazadPrice : item.initialPrice ) + item.lowestBidValue ||
        (item.mazad.length < 1 &&
          +val >= item.initialPrice + item.lowestBidValue)) &&
      condition
    ) {
      socket.emit("Send_Mazad", {
        message: { value: val, userId: auth?._id, name: auth?.name },
        room: item._id,
      });
      await onSubmit(val);
      createMessage(val, auth?._id, auth?.name);

      const element = document.querySelector(".Chatting-form");
      element.scrollTop = element.scrollHeight + 250;
    } else {
      notify("يجب ان تدخل قيمة أكبر من أخر قيمة", "warn");
    }
  };
  const createMessage = (val, userId, name) => {
    const hash = userId
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const color = `hsl(${hash % 360}, 70%, 50%)`;
    const newMessage = {
      id: Date.now(),
      color: color,
      icon: name[0],
      name: name,
      price: val,
      text: val + " جنية ",
      userId: userId,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setValue("");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(
        calculateTime(
          item?.date,
          item?.status === "not-started" ? item?.startTime : item?.endTime
        )
      );
      if (
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0 &&
        Object.keys(item).length > 0
      ) {
        if (item.mazad?.length > 0 || messages.length > 0) {
          if (messages.length > 0)
            addToCartHandel(messages[messages.length - 1]?.userId);
          else addToCartHandel(item.mazad[item.mazad?.length - 1].user._id);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Box className="Chatting-form">
          <div className="Chatting-messages">
            {item.mazad?.length >= 1
              ? item.mazad.map((message, i) => (
                  <Box
                    sx={{
                      direction: message.user._id === auth?._id ? "rtl" : "ltr",
                    }}
                    key={i + 1}
                    className="Message"
                  >
                    <div
                      className="Message-icon"
                      style={{ backgroundColor: messageColors[i] }}
                    >
                      {message?.user?.name[0].toUpperCase()}
                    </div>
                    <div className="Message-cont">{message.price} جنية</div>
                  </Box>
                ))
              : null}
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{ direction: message.userId === auth?._id ? "rtl" : "ltr" }}
                className="Message"
              >
                <div
                  className="Message-icon"
                  style={{ backgroundColor: message.color }}
                >
                  {message.icon}
                </div>
                <div className="Message-cont">{message.text}</div>
              </Box>
            ))}
          </div>
          <Box
            sx={{
              position: "absolute",
              top: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: "4",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              width: "350px",
              background: "rgba(238, 224, 255, 1)",
              padding: "20px",
              borderRadius: "15px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "5px",
            }}
          >
            <Box
              sx={{
                direction: "ltr",
                borderRadius: "15px",
                width: "220px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#2E3D62",
                backgroundColor: " rgba(255, 255, 255, 0.7)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body2"
                  component="body2"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  {timeLeft.days}
                </Typography>
                <Typography
                  variant="body2"
                  component="body2"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  يوم
                </Typography>
              </Box>
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  fontWeight: "600",
                  marginX: "8px",
                }}
              >
                :
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body2"
                  component="body2"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  {timeLeft.hours}
                </Typography>
                <Typography
                  variant="body2"
                  component="body2"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  ساعة
                </Typography>
              </Box>
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  fontWeight: "600",
                  marginX: "8px",
                }}
              >
                :
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body2"
                  component="body2"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  {timeLeft.minutes}
                </Typography>
                <Typography
                  variant="body2"
                  component="body2"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  دقيقة
                </Typography>
              </Box>
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  fontWeight: "600",
                  marginX: "8px",
                }}
              >
                :
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body2"
                  component="body2"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  {timeLeft.seconds}
                </Typography>
                <Typography
                  variant="body2"
                  component="body2"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  ثانية
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="h6"
              component="h6"
              sx={{
                fontWeight: "700",
              }}
            >
              حتى نهاية المزاد{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "25px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <img
          src={sendIcon}
          className="chatting-icon"
          alt="sendIcon"
          style={{ width: "80px" }}
        />

        <input
          className="chatting-input"
          type="number"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name="mazd-value"
          placeholder="ادخل قيمة الزايدة"
          id="mazd-value"
          min={item.initialPrice}
          step={+item.lowestBidValue}
        />
        <Button
          sx={{
            padding: "0 40px",
            fontSize: { xs: "15px", sm: "15px", md: "18px", lg: "20px" },
            outline: "none",
            border: "none",
            height: { xs: "50px", sm: "50px", md: "50px", lg: "60px" },
            width: "auto",
            background:
              "-webkit-linear-gradient(135deg, rgb(255, 99, 222) 0%, rgb(216, 67, 226) 44%, rgb(177, 34, 230) 100%)",
            boxShadow: "0px 8px 8px 0px rgba(0, 0, 0, 0.2)",
            borderRadius: "30px",
            color: "white",
          }}
          onClick={() => sendValue(value)}
        >
          ارسال القيمة
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: "25px",

          padding: "35px",
          background: "rgba(238, 224, 255, 1)",
          borderRadius: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "35px",
            fontSize: "20px",
            fontWeight: "700",
            marginY: "35px",
          }}
        >
          <Typography variant="h5" component="h5">
            أقصى قيمة للمزاد حاليا :{" "}
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              fontWeight: "700",
            }}
          >
            {messages.length > 0
              ? messages[messages.length - 1]?.price
              : item?.mazad?.length > 0
              ? item?.mazad[item?.mazad?.length - 1]?.price
              : item?.initialPrice}{" "}
            جنية
          </Typography>
        </Box>
        <hr />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "35px",
            fontSize: "20px",
            fontWeight: "700",
            marginY: "35px",
          }}
        >
          <Typography variant="h5" component="h5">
            أكثر المتفاعلين في المزاد :{" "}
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              fontWeight: "700",
            }}
          >
            {messages.length > 0
              ? messages[messages.length - 1]?.name
              : item?.mazad?.length > 0
              ? item?.mazad[item?.mazad?.length - 1]?.user?.name
              : "لا يوجد "}{" "}
          </Typography>
        </Box>
      </Box>

      <ToastContainer />
    </>
  );
};

export default Chatting;
