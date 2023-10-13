import React, { useState, useEffect } from 'react';
import sendIcon from "../../images/send.png";
import io from "socket.io-client";
import AddMazadHook from '../../hook/products/AddMazadHook';
import notify from '../../hook/useNotifaction';
import { ToastContainer } from 'react-toastify';



const Chatting = ({ item }) => {

    const [ onSubmit ] = AddMazadHook(item._id)

    let auth 
    if(localStorage.getItem("user") !== null){
      auth = JSON.parse(localStorage.getItem("user"))
    }
    const socket = io.connect("http://127.0.0.1:9000");
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageColors, setMessageColors] = useState([]);

    const changeColor=()=>{
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color
    } 

    useEffect(() => {
        if (item.mazad?.length >= 1 && !messageColors.length) {
            const colors = item.mazad.map(() => changeColor());
            setMessageColors(colors);
        }
    }, [item.mazad, messageColors]);

    const createMessage = (val) => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        const newMessage = {
            id: Date.now(),
            color: color,
            icon: '👤',
            text: val + " جنية ",
            userId:auth?._id
        };

        setMessages([...messages, newMessage]);
        setValue("");
    };

    const sendValue = (val) => {
        if (item.mazad[item.mazad.length-1]){
            if (val !== "" &&
             +val >= item.mazad[item.mazad.length-1].price+item.LowestBidValue &&
             Number(val) >= (Number(messages[messages.length-1]?.text.split(" ")[0])+item.LowestBidValue || 0)
             ) {
                
                socket.emit("Send_Mazad", { message: val, room: item._id });
                onSubmit(val)
                createMessage(val);
            }
            else{
                notify('يجب ان تدخل قيمة أكبر من أخر قيمة ' , "warn")
            }

        }
        else{
            console.log(messages);
            let condition
            if(messages.length <1)
            condition = +val >= item.InitialPrice+item.LowestBidValue
            else 
            condition=Number(val) >= (Number(messages[messages.length-1]?.text.split(" ")[0])+item.LowestBidValue || 0)
            if (val !== "" &&  condition) {
                socket.emit("Send_Mazad", { message: val, room: item._id });
                onSubmit(val)
                createMessage(val);
            }
            else{
                notify('يجب ان تدخل قيمة أكبر من أخر قيمة', "warn")
            }
        }
       
    };

    useEffect(() => {
        socket.emit("Join_Room", item._id);

        const handleReceiveMessage = (data) => {
            createMessage(data);
        };

        socket.on("Recieve_Mazad", handleReceiveMessage);

        return () => {
            socket.off("Recieve_Mazad", handleReceiveMessage);
        };
    }, [socket, item._id, messages]);

    return (
        <div className='Chatting-form'>
            <div className="Chatting-messages">
                {
                    item.mazad?.length >= 1 ? item.mazad.map((message , i) => (
                        <div key={i+1} className="Message">
                            <div className="Message-icon" style={{ backgroundColor: messageColors[i] }}>{message?.user?.name[0].toUpperCase()}</div>
                            <div className="Message-cont">{message.price} جنية</div>
                        </div>
                    )) :null
                }
                {messages.map((message) => (
                    <div key={message.id} className="Message">
                        <div className="Message-icon" style={{ backgroundColor: message.color }}>{message.icon}</div>
                        <div className="Message-cont">{message.text}</div>
                    </div>
                ))}
            </div>
            <div className="Chatting-input">
                <input
                    type="number"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    name="mazd-value"
                    placeholder='اكتب رقم'
                    id="mazd-value"
                    min={item.InitialPrice}
                    step={5}
                />
                <img src={sendIcon} onClick={() => sendValue(value)} className='send' alt="sendIcon" />
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Chatting;
