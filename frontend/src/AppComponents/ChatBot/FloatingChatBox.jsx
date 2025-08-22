// // // // import React, { useState, useRef, useEffect } from 'react';
// // // // import { Button } from '../../components/ui/button';
// // // // import { Textarea } from '../../components/ui/textarea';
// // // // import { ScrollArea } from '../../components/ui/scroll-area';
// // // // import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
// // // // import chatbotAvatar from "../../assets/chatbotAvatar.jpeg";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { useAuthStore } from '../../store/useAuthStore'; 

// // // // const FloatingChatbot = () => {
// // // //   const { user } = useAuthStore();
// // // //   const [isOpen, setIsOpen] = useState(false);
// // // //   const [messages, setMessages] = useState([
// // // //     {
// // // //       id: 1,
// // // //       text: "👋 Hi! I'm your assistant. How can I help you today?",
// // // //       isUser: false,
// // // //       timestamp: new Date()
// // // //     }
// // // //   ]);
// // // //   const [input, setInput] = useState("");
// // // //   const [isTyping, setIsTyping] = useState(false);
// // // //   const [quickButtons, setQuickButtons] = useState([
// // // //     { label: "Find Alumni"},
// // // //     { label: "Find Discussion Forums" },
// // // //     { label: "Create Event"},
// // // //     { label: "Fund Raise"}
// // // //   ]);

// // // //   const messagesEndRef = useRef(null);
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     if (messagesEndRef.current) {
// // // //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// // // //     }
// // // //   }, [messages, isTyping]);

// // // //   const handleSendMessage = (text, link = null, responseText = null) => {
// // // //     if (!text.trim()) return;

// // // //     const newMessage = {
// // // //       id: Date.now().toString(),
// // // //       text,
// // // //       isUser: true,
// // // //       timestamp: new Date()
// // // //     };

// // // //     setMessages(prev => [...prev, newMessage]);
// // // //     setInput("");
// // // //     setIsTyping(true);

// // // //     // Define services based on role
// // // //     let services;
// // // //     if (user?.role === "admin" || user?.role === "Alumni") {
// // // //       services = {
// // // //         "Find Alumni": {
// // // //           response: "Great! Please tell me the batch year or department you are looking for.",
// // // //           options: [
// // // //             { label: "Go to Alumni Page", link: "/find-Alumnies", response: "Navigating to Alumni Page 👨‍🎓" }
// // // //           ]
// // // //         },
// // // //         "Find Discussion Forums": {
// // // //           response: "Awesome! 🔍 You can browse or create discussion forums.",
// // // //           options: [
// // // //             { label: "View Discussions", link: "/discussions", response: "Opening all discussions 💬" },
// // // //             { label: "Create Discussion", link: "/discussions/create-discussion", response: "Let's create a new discussion ✍️" }
// // // //           ]
// // // //         },
// // // //         "Create Event": {
// // // //           response: "Sure ✅ Do you want to create or view an event?",
// // // //           options: [
// // // //             { label: "Create Event", link: "/events/add-events", response: "Redirecting to create a new event 🎉" },
// // // //             { label: "View Events", link: "/events", response: "Here are all upcoming events 📅" }
// // // //           ]
// // // //         },
// // // //         "Fund Raise": {
// // // //           response: "Got it 💰. Are you raising funds for a Project or for a Cause?",
// // // //           options: [
// // // //             { label: "Create Fund Raising Event", link: "/fund-raising", response: "Let's create a fundraising event 🚀" },
// // // //             { label: "View Fund Raising Events", link: "/fund-raising/list", response: "Here are all fundraising events 📌" }
// // // //           ]
// // // //         }
// // // //       };
// // // //     } else {
// // // //       services = {
// // // //         "Find Alumni": {
// // // //           response: "Great! Please tell me the batch year, department, or location you are looking for.",
// // // //           options: [
// // // //             { label: "By Batch Year", link: "/find-Alumnies", response: "Filtering alumni by batch year 🎓" },
// // // //             { label: "By Department", link: "/find-Alumnies", response: "Filtering alumni by department 🏫" },
// // // //             { label: "By Location", link: "/find-Alumnies", response: "Filtering alumni by location 🌍" }
// // // //           ]
// // // //         },
// // // //         "Find Discussion Forums": {
// // // //           response: "Awesome! 🔍 You can join or start a discussion.",
// // // //           options: [
// // // //             { label: "View Discussions", link: "/discussions", response: "Here are the latest discussions 💭" },
// // // //             { label: "Create Discussion", link: "/discussions/create-discussion", response: "Let's start a new discussion 📝" }
// // // //           ]
// // // //         }
// // // //       };
// // // //     }

// // // //     // Handle matched service
// // // //     if (services[text]) {
// // // //       setTimeout(() => {
// // // //         const botMessage = {
// // // //           id: (Date.now() + 1).toString(),
// // // //           text: services[text].response,
// // // //           isUser: false,
// // // //           timestamp: new Date()
// // // //         };
// // // //         setMessages(prev => [...prev, botMessage]);
// // // //         setQuickButtons(services[text].options || []);
// // // //         setIsTyping(false);
// // // //       }, 500);
// // // //       return;
// // // //     }

// // // //     // Handle button clicks with responses
// // // //     if (responseText && link) {
// // // //       setTimeout(() => {
// // // //         const botMessage = {
// // // //           id: (Date.now() + 1).toString(),
// // // //           text: responseText,
// // // //           isUser: false,
// // // //           timestamp: new Date()
// // // //         };
// // // //         setMessages(prev => [...prev, botMessage]);
// // // //         setIsTyping(false);
        
// // // //         // Navigate after showing the response
// // // //         setTimeout(() => {
// // // //           navigate(link);
// // // //         }, 1000);
// // // //       }, 500);
// // // //       return;
// // // //     }

// // // //     // Default fallback
// // // //     setTimeout(() => {
// // // //       const botMessage = {
// // // //         id: (Date.now() + 1).toString(),
// // // //         text: "🤔 I'm not sure about that. Try selecting one of the options below.",
// // // //         isUser: false,
// // // //         timestamp: new Date()
// // // //       };
// // // //       setMessages(prev => [...prev, botMessage]);
// // // //       setIsTyping(false);
// // // //     }, 1000);
// // // //   };

// // // //   const handleQuickButtonClick = (btn) => {
// // // //     // If button has a response, show it first then navigate
// // // //     if (btn.response && btn.link) {
// // // //       handleSendMessage(btn.label, btn.link, btn.response);
// // // //     } else if (btn.link) {
// // // //       // If only link, navigate immediately
// // // //       handleSendMessage(btn.label, btn.link);
// // // //       navigate(btn.link);
// // // //     } else {
// // // //       // If no link, just handle as regular message
// // // //       handleSendMessage(btn.label);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="fixed bottom-4 right-4 z-50">
// // // //       {!isOpen ? (
// // // //         <button
// // // //           onClick={() => setIsOpen(true)}
// // // //           className="p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition"
// // // //         >
// // // //           <MessageCircle className="text-white w-6 h-6" />
// // // //         </button>
// // // //       ) : (
// // // //         <div className="w-80 h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // // //           {/* Header */}
// // // //           <div className="flex items-center justify-between p-3 bg-blue-600 text-white">
// // // //             <div className="flex items-center space-x-2">
// // // //               <img src={chatbotAvatar} alt="Bot" className="w-8 h-8 rounded-full" />
// // // //               <h2 className="text-sm font-semibold">Assistant</h2>
// // // //             </div>
// // // //             <div className="flex space-x-2">
// // // //               <button onClick={() => setIsOpen(false)}>
// // // //                 <Minimize2 className="w-4 h-4" />
// // // //               </button>
// // // //               <button onClick={() => setIsOpen(false)}>
// // // //                 <X className="w-4 h-4" />
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Messages */}
// // // //           <ScrollArea className="flex-1 p-3">
// // // //             {messages.map(msg => (
// // // //               <div
// // // //                 key={msg.id}
// // // //                 className={`mb-2 flex ${msg.isUser ? "justify-end" : "justify-start"}`}
// // // //               >
// // // //                 <div
// // // //                   className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${
// // // //                     msg.isUser
// // // //                       ? "bg-blue-600 text-white rounded-br-none"
// // // //                       : "bg-gray-200 text-gray-800 rounded-bl-none"
// // // //                   }`}
// // // //                 >
// // // //                   {msg.text}
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //             {isTyping && (
// // // //               <div className="text-gray-500 text-xs">Bot is typing...</div>
// // // //             )}
// // // //             <div ref={messagesEndRef} />
// // // //           </ScrollArea>

// // // //           {/* Quick Buttons */}
// // // //           {quickButtons.length > 0 && (
// // // //             <div className="flex flex-wrap gap-2 p-2">
// // // //               {quickButtons.map((btn, idx) => (
// // // //                 <Button
// // // //                   key={idx}
// // // //                   onClick={() => handleQuickButtonClick(btn)}
// // // //                   className="px-3 py-1 rounded-lg text-xs hover:scale-105 transition-transform"
// // // //                 >
// // // //                   {btn.label}
// // // //                 </Button>
// // // //               ))}
// // // //             </div>
// // // //           )}

// // // //           {/* Input */}
// // // //           <div className="p-3 border-t flex items-center space-x-2">
// // // //             <Textarea
// // // //               value={input}
// // // //               onChange={(e) => setInput(e.target.value)}
// // // //               onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage(input)}
// // // //               placeholder="Type a message..."
// // // //               className="flex-1 resize-none rounded-lg"
// // // //               rows={1}
// // // //             />
// // // //             <button
// // // //               onClick={() => handleSendMessage(input)}
// // // //               className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700"
// // // //             >
// // // //               <Send className="w-4 h-4 text-white" />
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default FloatingChatbot;
// // // /*
// // //  * FloatingChatbot Component with API Integration
// // //  * 
// // //  * Expected API Endpoint: POST /api/chatbot/message
// // //  * 
// // //  * Request Body:
// // //  * {
// // //  *   message: string,
// // //  *   userId: string,
// // //  *   userRole: string,
// // //  *   timestamp: string,
// // //  *   context: {
// // //  *     currentPage: string,
// // //  *     sessionId: string
// // //  *   }
// // //  * }
// // //  * 
// // //  * Expected API Response:
// // //  * {
// // //  *   success: boolean,
// // //  *   message: string, // Bot's response message
// // //  *   suggestions?: [
// // //  *     {
// // //  *       label: string, // Button text
// // //  *       link?: string, // Optional navigation link
// // //  *       response?: string, // Optional response before navigation
// // //  *       action?: string // Special actions like "retry"
// // //  *     }
// // //  *   ],
// // //  *   metadata?: any // Optional additional data
// // //  * }
// // //  */

// // // import React, { useState, useRef, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { Button } from '../../components/ui/button';
// // // import { Textarea } from '../../components/ui/textarea';
// // // import { ScrollArea } from '../../components/ui/scroll-area';
// // // import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
// // // import chatbotAvatar from "../../assets/chatbotAvatar.jpeg";
// // // import { useNavigate } from "react-router-dom";
// // // import { useAuthStore } from '../../store/useAuthStore'; 

// // // const FloatingChatbot = () => {
// // //   const { user } = useAuthStore();
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [messages, setMessages] = useState([
// // //     {
// // //       id: 1,
// // //       text: "👋 Hi! I'm your assistant. How can I help you today?",
// // //       isUser: false,
// // //       timestamp: new Date()
// // //     }
// // //   ]);
// // //   const [input, setInput] = useState("");
// // //   const [isTyping, setIsTyping] = useState(false);
// // //   const [isConnected, setIsConnected] = useState(true);
// // //   const [quickButtons, setQuickButtons] = useState([
// // //     { label: "Find Alumni"},
// // //     { label: "Find Discussion Forums" },
// // //     { label: "Create Event"},
// // //     { label: "Fund Raise"}
// // //   ]);

// // //   const messagesEndRef = useRef(null);
// // //   const navigate = useNavigate();

// // //   // Create axios instance with default config
// // //   const apiClient = axios.create({
// // //     baseURL: process.env.REACT_APP_API_URL || '',
// // //     timeout: 10000, // 10 seconds timeout
// // //     headers: {
// // //       'Content-Type': 'application/json',
// // //     }
// // //   });

// // //   // Add request interceptor to include auth token
// // //   useEffect(() => {
// // //     const requestInterceptor = apiClient.interceptors.request.use(
// // //       (config) => {
// // //         if (user?.token) {
// // //           config.headers.Authorization = `Bearer ${user.token}`;
// // //         }
// // //         return config;
// // //       },
// // //       (error) => {
// // //         return Promise.reject(error);
// // //       }
// // //     );

// // //     // Cleanup interceptor on unmount
// // //     return () => {
// // //       apiClient.interceptors.request.eject(requestInterceptor);
// // //     };
// // //   }, [user?.token, apiClient]);

// // //   useEffect(() => {
// // //     if (messagesEndRef.current) {
// // //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// // //     }
// // //   }, [messages, isTyping]);

// // //   // API call function using axios
// // //   const sendMessageToAPI = async (message) => {
// // //     try {
// // //       const requestData = {
// // //         message: message,
// // //         userId: user?.id,
// // //         userRole: user?.role,
// // //         timestamp: new Date().toISOString(),
// // //         context: {
// // //           currentPage: window.location.pathname,
// // //           sessionId: sessionStorage.getItem('chatSessionId') || Date.now().toString()
// // //         }
// // //       };

// // //       const response = await apiClient.post('/api/chatbot/message', requestData);
      
// // //       setIsConnected(true);
      
// // //       return response.data;
// // //     } catch (error) {
// // //       console.error('API Error:', error);
// // //       setIsConnected(false);
      
// // //       // Handle different types of errors
// // //       let errorMessage = "Sorry, I'm having trouble connecting to the server. Please try again later. 🔄";
      
// // //       if (error.code === 'ECONNABORTED') {
// // //         errorMessage = "Request timed out. Please check your connection and try again. ⏰";
// // //       } else if (error.response) {
// // //         // Server responded with error status
// // //         const status = error.response.status;
// // //         if (status === 401) {
// // //           errorMessage = "Authentication required. Please log in and try again. 🔐";
// // //         } else if (status === 403) {
// // //           errorMessage = "You don't have permission to access this service. 🚫";
// // //         } else if (status === 429) {
// // //           errorMessage = "Too many requests. Please wait a moment and try again. 🚦";
// // //         } else if (status >= 500) {
// // //           errorMessage = "Server is experiencing issues. Please try again later. 🔧";
// // //         }
// // //       } else if (error.request) {
// // //         errorMessage = "Network connection problem. Please check your internet connection. 📶";
// // //       }

// // //       return {
// // //         success: false,
// // //         message: errorMessage,
// // //         suggestions: [
// // //           { label: "Try Again", action: "retry" },
// // //           { label: "Contact Support", link: "/support", response: "Opening support page 🆘" }
// // //         ]
// // //       };
// // //     }
// // //   };

// // //   const handleSendMessage = async (text, link = null, responseText = null) => {
// // //     if (!text.trim()) return;

// // //     const newMessage = {
// // //       id: Date.now().toString(),
// // //       text,
// // //       isUser: true,
// // //       timestamp: new Date()
// // //     };

// // //     setMessages(prev => [...prev, newMessage]);
// // //     setInput("");
// // //     setIsTyping(true);

// // //     // Define services based on role
// // //     let services;
// // //     if (user?.role === "admin" || user?.role === "Alumni") {
// // //       services = {
// // //         "Find Alumni": {
// // //           response: "Great! Please tell me the batch year or department you are looking for.",
// // //           options: [
// // //             { label: "Go to Alumni Page", link: "/find-Alumnies", response: "Navigating to Alumni Page 👨‍🎓" }
// // //           ]
// // //         },
// // //         "Find Discussion Forums": {
// // //           response: "Awesome! 🔍 You can browse or create discussion forums.",
// // //           options: [
// // //             { label: "View Discussions", link: "/discussions", response: "Opening all discussions 💬" },
// // //             { label: "Create Discussion", link: "/discussions/create-discussion", response: "Let's create a new discussion ✍️" }
// // //           ]
// // //         },
// // //         "Create Event": {
// // //           response: "Sure ✅ Do you want to create or view an event?",
// // //           options: [
// // //             { label: "Create Event", link: "/events/add-events", response: "Redirecting to create a new event 🎉" },
// // //             { label: "View Events", link: "/events", response: "Here are all upcoming events 📅" }
// // //           ]
// // //         },
// // //         "Fund Raise": {
// // //           response: "Got it 💰. Are you raising funds for a Project or for a Cause?",
// // //           options: [
// // //             { label: "Create Fund Raising Event", link: "/fund-raising", response: "Let's create a fundraising event 🚀" },
// // //             { label: "View Fund Raising Events", link: "/fund-raising/list", response: "Here are all fundraising events 📌" }
// // //           ]
// // //         }
// // //       };
// // //     } else {
// // //       services = {
// // //         "Find Alumni": {
// // //           response: "Great! Please tell me the batch year, department, or location you are looking for.",
// // //           options: [
// // //             { label: "By Batch Year", link: "/find-Alumnies", response: "Filtering alumni by batch year 🎓" },
// // //             { label: "By Department", link: "/find-Alumnies", response: "Filtering alumni by department 🏫" },
// // //             { label: "By Location", link: "/find-Alumnies", response: "Filtering alumni by location 🌍" }
// // //           ]
// // //         },
// // //         "Find Discussion Forums": {
// // //           response: "Awesome! 🔍 You can join or start a discussion.",
// // //           options: [
// // //             { label: "View Discussions", link: "/discussions", response: "Here are the latest discussions 💭" },
// // //             { label: "Create Discussion", link: "/discussions/create-discussion", response: "Let's start a new discussion 📝" }
// // //           ]
// // //         }
// // //       };
// // //     }

// // //     // Handle matched service (predefined buttons)
// // //     if (services[text]) {
// // //       setTimeout(() => {
// // //         const botMessage = {
// // //           id: (Date.now() + 1).toString(),
// // //           text: services[text].response,
// // //           isUser: false,
// // //           timestamp: new Date()
// // //         };
// // //         setMessages(prev => [...prev, botMessage]);
// // //         setQuickButtons(services[text].options || []);
// // //         setIsTyping(false);
// // //       }, 500);
// // //       return;
// // //     }

// // //     // Handle button clicks with responses
// // //     if (responseText && link) {
// // //       setTimeout(() => {
// // //         const botMessage = {
// // //           id: (Date.now() + 1).toString(),
// // //           text: responseText,
// // //           isUser: false,
// // //           timestamp: new Date()
// // //         };
// // //         setMessages(prev => [...prev, botMessage]);
// // //         setIsTyping(false);
        
// // //         // Navigate after showing the response
// // //         setTimeout(() => {
// // //           navigate(link);
// // //         }, 1000);
// // //       }, 500);
// // //       return;
// // //     }

// // //     // For custom messages (not predefined buttons), call API
// // //     if (!responseText && !link) {
// // //       try {
// // //         const apiResponse = await sendMessageToAPI(text);
        
// // //         const botMessage = {
// // //           id: (Date.now() + 1).toString(),
// // //           text: apiResponse.message || "I understand your message. How else can I help you?",
// // //           isUser: false,
// // //           timestamp: new Date()
// // //         };
        
// // //         setMessages(prev => [...prev, botMessage]);
        
// // //         // Update quick buttons if API provides suggestions
// // //         if (apiResponse.suggestions && apiResponse.suggestions.length > 0) {
// // //           setQuickButtons(apiResponse.suggestions);
// // //         } else {
// // //           // Reset to default buttons if no suggestions
// // //           setQuickButtons([
// // //             { label: "Find Alumni"},
// // //             { label: "Find Discussion Forums" },
// // //             { label: "Create Event"},
// // //             { label: "Fund Raise"}
// // //           ]);
// // //         }
        
// // //         setIsTyping(false);
// // //       } catch (error) {
// // //         // Error handling - show fallback message
// // //         const botMessage = {
// // //           id: (Date.now() + 1).toString(),
// // //           text: "🤔 I'm having trouble processing that. Please try selecting one of the options below or rephrase your message.",
// // //           isUser: false,
// // //           timestamp: new Date()
// // //         };
// // //         setMessages(prev => [...prev, botMessage]);
// // //         setIsTyping(false);
// // //       }
// // //     }
// // //   };

// // //   const handleQuickButtonClick = (btn) => {
// // //     // Handle special actions
// // //     if (btn.action === "retry") {
// // //       // Retry the last user message
// // //       const lastUserMessage = messages.filter(msg => msg.isUser).pop();
// // //       if (lastUserMessage) {
// // //         handleSendMessage(lastUserMessage.text);
// // //       }
// // //       return;
// // //     }
    
// // //     // If button has a response, show it first then navigate
// // //     if (btn.response && btn.link) {
// // //       handleSendMessage(btn.label, btn.link, btn.response);
// // //     } else if (btn.link) {
// // //       // If only link, navigate immediately
// // //       handleSendMessage(btn.label, btn.link);
// // //       navigate(btn.link);
// // //     } else {
// // //       // If no link, just handle as regular message
// // //       handleSendMessage(btn.label);
// // //     }
// // //   };

// // //   return (
// // //     <div className="fixed bottom-4 right-4 z-50">
// // //       {!isOpen ? (
// // //         <button
// // //           onClick={() => setIsOpen(true)}
// // //           className="p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition"
// // //         >
// // //           <MessageCircle className="text-white w-6 h-6" />
// // //         </button>
// // //       ) : (
// // //         <div className="w-80 h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // //           {/* Header */}
// // //           <div className="flex items-center justify-between p-3 bg-blue-600 text-white">
// // //             <div className="flex items-center space-x-2">
// // //               <img src={chatbotAvatar} alt="Bot" className="w-8 h-8 rounded-full" />
// // //               <div className="flex flex-col">
// // //                 <h2 className="text-sm font-semibold">Assistant</h2>
// // //                 <div className="flex items-center space-x-1">
// // //                   <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
// // //                   <span className="text-xs opacity-75">{isConnected ? 'Online' : 'Offline'}</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //             <div className="flex space-x-2">
// // //               <button onClick={() => setIsOpen(false)}>
// // //                 <Minimize2 className="w-4 h-4" />
// // //               </button>
// // //               <button onClick={() => setIsOpen(false)}>
// // //                 <X className="w-4 h-4" />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Messages */}
// // //           <ScrollArea className="flex-1 p-3">
// // //             {messages.map(msg => (
// // //               <div
// // //                 key={msg.id}
// // //                 className={`mb-2 flex ${msg.isUser ? "justify-end" : "justify-start"}`}
// // //               >
// // //                 <div
// // //                   className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${
// // //                     msg.isUser
// // //                       ? "bg-blue-600 text-white rounded-br-none"
// // //                       : "bg-gray-200 text-gray-800 rounded-bl-none"
// // //                   }`}
// // //                 >
// // //                   {msg.text}
// // //                 </div>
// // //               </div>
// // //             ))}
// // //             {isTyping && (
// // //               <div className="text-gray-500 text-xs">Bot is typing...</div>
// // //             )}
// // //             <div ref={messagesEndRef} />
// // //           </ScrollArea>

// // //           {/* Quick Buttons */}
// // //           {quickButtons.length > 0 && (
// // //             <div className="flex flex-wrap gap-2 p-2">
// // //               {quickButtons.map((btn, idx) => (
// // //                 <Button
// // //                   key={idx}
// // //                   onClick={() => handleQuickButtonClick(btn)}
// // //                   className="px-3 py-1 rounded-lg text-xs hover:scale-105 transition-transform"
// // //                 >
// // //                   {btn.label}
// // //                 </Button>
// // //               ))}
// // //             </div>
// // //           )}

// // //           {/* Input */}
// // //           <div className="p-3 border-t flex items-center space-x-2">
// // //             <Textarea
// // //               value={input}
// // //               onChange={(e) => setInput(e.target.value)}
// // //               onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage(input)}
// // //               placeholder="Type a message..."
// // //               className="flex-1 resize-none rounded-lg"
// // //               rows={1}
// // //             />
// // //             <button
// // //               onClick={() => handleSendMessage(input)}
// // //               className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700"
// // //             >
// // //               <Send className="w-4 h-4 text-white" />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default FloatingChatbot;
// // import React, { useState, useRef, useEffect } from 'react';
// // import axios from 'axios';
// // import { Button } from '../../components/ui/button';
// // import { Textarea } from '../../components/ui/textarea';
// // import { ScrollArea } from '../../components/ui/scroll-area';
// // import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
// // import chatbotAvatar from "../../assets/chatbotAvatar.jpeg";
// // import { useNavigate } from "react-router-dom";
// // import { useAuthStore } from '../../store/useAuthStore'; 

// // const FloatingChatbot = () => {
// //   const { user } = useAuthStore();
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [messages, setMessages] = useState([
// //     {
// //       id: 1,
// //       text: "👋 Hi! I'm your assistant. How can I help you today?",
// //       isUser: false,
// //       timestamp: new Date()
// //     }
// //   ]);
// //   const [input, setInput] = useState("");
// //   const [isTyping, setIsTyping] = useState(false);
// //   const [isConnected, setIsConnected] = useState(true);
// //   const [quickButtons, setQuickButtons] = useState([
// //     { label: "Find Alumni"},
// //     { label: "Find Discussion Forums" },
// //     { label: "Create Event"},
// //     { label: "Fund Raise"}
// //   ]);

// //   const messagesEndRef = useRef(null);
// //   const navigate = useNavigate();

// //   // axios client
// //   const apiClient = axios.create({
// //     //baseURL: process.env.REACT_APP_API_URL || '',
// //     timeout: 10000,
// //     headers: { 'Content-Type': 'application/json' }
// //   });

// //   useEffect(() => {
// //     const interceptor = apiClient.interceptors.request.use((config) => {
// //       if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
// //       return config;
// //     });
// //     return () => apiClient.interceptors.request.eject(interceptor);
// //   }, [user?.token]);

// //   useEffect(() => {
// //     if (messagesEndRef.current) {
// //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// //     }
// //   }, [messages, isTyping]);

// //   // ✅ services based on role
// //   const getServices = () => {
// //     if (user?.role === "admin" || user?.role === "Alumni") {
// //       return {
// //         "Find Alumni": {
// //           response: "Great! Please tell me the batch year or department you are looking for.",
// //           options: [
// //             { label: "Go to Alumni Page", link: "/find-Alumnies", response: "Navigating to Alumni Page 👨‍🎓" }
// //           ]
// //         },
// //         "Find Discussion Forums": {
// //           response: "Awesome! 🔍 You can browse or create discussion forums.",
// //           options: [
// //             { label: "View Discussions", link: "/discussions", response: "Opening all discussions 💬" },
// //             { label: "Create Discussion", link: "/discussions/create-discussion", response: "Let's create a new discussion ✍️" }
// //           ]
// //         },
// //         "Create Event": {
// //           response: "Sure ✅ Do you want to create or view an event?",
// //           options: [
// //             { label: "Create Event", link: "/events/add-events", response: "Redirecting to create a new event 🎉" },
// //             { label: "View Events", link: "/events", response: "Here are all upcoming events 📅" }
// //           ]
// //         },
// //         "Fund Raise": {
// //           response: "Got it 💰. Are you raising funds for a Project or for a Cause?",
// //           options: [
// //             { label: "Create Fund Raising Event", link: "/fund-raising", response: "Let's create a fundraising event 🚀" },
// //             { label: "View Fund Raising Events", link: "/fund-raising/list", response: "Here are all fundraising events 📌" }
// //           ]
// //         }
// //       };
// //     } else {
// //       return {
// //         "Find Alumni": {
// //           response: "Great! Please tell me the batch year, department, or location you are looking for.",
// //           options: [
// //             { label: "By Batch Year", link: "/find-Alumnies", response: "Filtering alumni by batch year 🎓" },
// //             { label: "By Department", link: "/find-Alumnies", response: "Filtering alumni by department 🏫" },
// //             { label: "By Location", link: "/find-Alumnies", response: "Filtering alumni by location 🌍" }
// //           ]
// //         },
// //         "Find Discussion Forums": {
// //           response: "Awesome! 🔍 You can join or start a discussion.",
// //           options: [
// //             { label: "View Discussions", link: "/discussions", response: "Here are the latest discussions 💭" },
// //             { label: "Create Discussion", link: "/discussions/create-discussion", response: "Let's start a new discussion 📝" }
// //           ]
// //         }
// //       };
// //     }
// //   };

// //   // ✅ API call
// //   const sendMessageToAPI = async (message) => {
// //     try {
// //       const requestData = {
// //         message,
// //         userId: user?.id,
// //         userRole: user?.role,
// //         timestamp: new Date().toISOString(),
// //         context: {
// //           currentPage: window.location.pathname,
// //           sessionId: sessionStorage.getItem('chatSessionId') || Date.now().toString()
// //         }
// //       };
// //       const response = await apiClient.post('/api/chatbot/message', requestData);
// //       setIsConnected(true);
// //       return response.data;
// //     } catch (error) {
// //       console.error("API Error:", error);
// //       setIsConnected(false);
// //       return {
// //         success: false,
// //         message: "⚠️ I'm having trouble connecting. Please try again.",
// //         suggestions: [
// //           { label: "Retry", action: "retry" },
// //           { label: "Contact Support", link: "/support", response: "Opening support page 🆘" }
// //         ]
// //       };
// //     }
// //   };

// //   // ✅ main send handler
// //   const handleSendMessage = async (text, link = null, responseText = null) => {
// //     if (!text.trim()) return;

// //     const newMessage = { id: Date.now().toString(), text, isUser: true, timestamp: new Date() };
// //     setMessages((prev) => [...prev, newMessage]);
// //     setInput("");
// //     setIsTyping(true);

// //     const services = getServices();

// //     // If matches a service → respond with service
// //     if (services[text]) {
// //       setTimeout(() => {
// //         const botMessage = { id: (Date.now() + 1).toString(), text: services[text].response, isUser: false, timestamp: new Date() };
// //         setMessages((prev) => [...prev, botMessage]);
// //         setQuickButtons(services[text].options || []);
// //         setIsTyping(false);
// //       }, 500);
// //       return;
// //     }

// //     // If button clicked with response → show response + navigate
// //     if (responseText && link) {
// //       setTimeout(() => {
// //         const botMessage = { id: (Date.now() + 1).toString(), text: responseText, isUser: false, timestamp: new Date() };
// //         setMessages((prev) => [...prev, botMessage]);
// //         setIsTyping(false);
// //         setTimeout(() => navigate(link), 1000);
// //       }, 500);
// //       return;
// //     }

// //     // Otherwise → push to API
// //     try {
// //       const apiResponse = await sendMessageToAPI(text);
// //       const botMessage = { id: (Date.now() + 1).toString(), text: apiResponse.message || "🤔 I didn’t get that, try again.", isUser: false, timestamp: new Date() };
// //       setMessages((prev) => [...prev, botMessage]);
// //       setQuickButtons(apiResponse.suggestions || quickButtons);
// //       setIsTyping(false);
// //     } catch {
// //       const botMessage = { id: (Date.now() + 1).toString(), text: "⚠️ Something went wrong. Try again later.", isUser: false, timestamp: new Date() };
// //       setMessages((prev) => [...prev, botMessage]);
// //       setIsTyping(false);
// //     }
// //   };

// //   // ✅ button click handler
// //   const handleQuickButtonClick = (btn) => {
// //     if (btn.action === "retry") {
// //       const lastUserMsg = messages.filter((m) => m.isUser).pop();
// //       if (lastUserMsg) handleSendMessage(lastUserMsg.text);
// //       return;
// //     }
// //     if (btn.response && btn.link) {
// //       handleSendMessage(btn.label, btn.link, btn.response);
// //     } else if (btn.link) {
// //       handleSendMessage(btn.label, btn.link);
// //       navigate(btn.link);
// //     } else {
// //       handleSendMessage(btn.label);
// //     }
// //   };

// //   return (
// //     <div className="fixed bottom-4 right-4 z-50">
// //       {!isOpen ? (
// //         <button onClick={() => setIsOpen(true)} className="p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition">
// //           <MessageCircle className="text-white w-6 h-6" />
// //         </button>
// //       ) : (
// //         <div className="w-80 h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// //           {/* Header */}
// //           <div className="flex items-center justify-between p-3 bg-blue-600 text-white">
// //             <div className="flex items-center space-x-2">
// //               <img src={chatbotAvatar} alt="Bot" className="w-8 h-8 rounded-full" />
// //               <div className="flex flex-col">
// //                 <h2 className="text-sm font-semibold">Assistant</h2>
// //                 <div className="flex items-center space-x-1">
// //                   <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`}></div>
// //                   <span className="text-xs opacity-75">{isConnected ? "Online" : "Offline"}</span>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="flex space-x-2">
// //               <button onClick={() => setIsOpen(false)}><Minimize2 className="w-4 h-4" /></button>
// //               <button onClick={() => setIsOpen(false)}><X className="w-4 h-4" /></button>
// //             </div>
// //           </div>

// //           {/* Messages */}
// //           <ScrollArea className="flex-1 p-3">
// //             {messages.map((msg) => (
// //               <div key={msg.id} className={`mb-2 flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
// //                 <div className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${msg.isUser ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
// //                   {msg.text}
// //                 </div>
// //               </div>
// //             ))}
// //             {isTyping && <div className="text-gray-500 text-xs">Bot is typing...</div>}
// //             <div ref={messagesEndRef} />
// //           </ScrollArea>

// //           {/* Quick Buttons */}
// //           {quickButtons.length > 0 && (
// //             <div className="flex flex-wrap gap-2 p-2">
// //               {quickButtons.map((btn, idx) => (
// //                 <Button key={idx} onClick={() => handleQuickButtonClick(btn)} className="px-3 py-1 rounded-lg text-xs hover:scale-105 transition-transform">
// //                   {btn.label}
// //                 </Button>
// //               ))}
// //             </div>
// //           )}

// //           {/* Input */}
// //           <div className="p-3 border-t flex items-center space-x-2">
// //             <Textarea
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage(input)}
// //               placeholder="Type a message..."
// //               className="flex-1 resize-none rounded-lg"
// //               rows={1}
// //             />
// //             <button onClick={() => handleSendMessage(input)} className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700">
// //               <Send className="w-4 h-4 text-white" />
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default FloatingChatbot;
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { ScrollArea } from '../../components/ui/scroll-area';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import chatbotAvatar from "../../assets/chatbotAvatar.jpeg";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../../store/useAuthStore'; 

const FloatingChatbot = () => {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "👋 Hi! I'm your assistant. How can I help you today?", isUser: false, timestamp: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [quickButtons, setQuickButtons] = useState([
    { label: "Find Alumni" },
    { label: "Find Discussion Forums" },
    { label: "Create Event" },
    { label: "Fund Raise" }
  ]);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // axios instance
  const apiClient = axios.create({
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
  });

  useEffect(() => {
    const interceptor = apiClient.interceptors.request.use((config) => {
      if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
      return config;
    });
    return () => apiClient.interceptors.request.eject(interceptor);
  }, [user?.token]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // services by role
  const getServices = () => {
    if (user?.role === "admin" || user?.role === "Alumni") {
      return {
        "Find Alumni": {
          response: "Great! Please tell me the batch year or department you are looking for.",
          options: [
            { label: "Go to Alumni Page", link: "/find-Alumnies", response: "Navigating to Alumni Page 👨‍🎓" }
          ]
        },
        "Find Discussion Forums": {
          response: "Awesome! 🔍 You can browse or create discussion forums.",
          options: [
            { label: "View Discussions", link: "/discussions", response: "Opening all discussions 💬" },
            { label: "Create Discussion", link: "/discussions/create-discussion", response: "Let's create a new discussion ✍️" }
          ]
        },
        "Create Event": {
          response: "Sure ✅ Do you want to create or view an event?",
          options: [
            { label: "Create Event", link: "/events/add-events", response: "Redirecting to create a new event 🎉" },
            { label: "View Events", link: "/events", response: "Here are all upcoming events 📅" }
          ]
        },
        "Fund Raise": {
          response: "Got it 💰. Are you raising funds for a Project or for a Cause?",
          options: [
            { label: "Create Fund Raising Event", link: "/fund-raising", response: "Let's create a fundraising event 🚀" },
            { label: "View Fund Raising Events", link: "/fund-raising/list", response: "Here are all fundraising events 📌" }
          ]
        }
      };
    } else {
      return {
        "Find Alumni": {
          response: "Great! Please tell me the batch year, department, or location you are looking for.",
          options: [
            { label: "By Batch Year", link: "/find-Alumnies", response: "Filtering alumni by batch year 🎓" },
            { label: "By Department", link: "/find-Alumnies", response: "Filtering alumni by department 🏫" },
            { label: "By Location", link: "/find-Alumnies", response: "Filtering alumni by location 🌍" }
          ]
        },
        "Find Discussion Forums": {
          response: "Awesome! 🔍 You can join or start a discussion.",
          options: [
            { label: "View Discussions", link: "/discussions", response: "Here are the latest discussions 💭" },
            { label: "Create Discussion", link: "/discussions/create-discussion", response: "Let's start a new discussion 📝" }
          ]
        }
      };
    }
  };

  // API call
  const sendMessageToAPI = async (message) => {
    const services = getServices();

    try {
      const requestData = {
        message,
        userId: user?.id,
        userRole: user?.role,
        timestamp: new Date().toISOString(),
        context: {
          currentPage: window.location.pathname,
          sessionId: sessionStorage.getItem('chatSessionId') || Date.now().toString()
        }
      };
      const response = await apiClient.post('/api/chatbot/message', requestData);
      setIsConnected(true);
      setQuickButtons(services[text].options || []);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      setIsConnected(false);
      return {
        success: false,
        message: "⚠️ I'm having trouble connecting. Please try again.",
        suggestions: [
          { label: "Retry", action: "retry" },
          { label: "Contact Support", link: "/support", response: "Opening support page 🆘" }
        ]
      };
    }
  };

  // main send handler
  const handleSendMessage = async (text, link = null, responseText = null) => {
    if (!text.trim()) return;

    const newMessage = { id: Date.now().toString(), text, isUser: true, timestamp: new Date() };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    const services = getServices();

    if (services[text]) {
      setTimeout(() => {
        const botMessage = { id: (Date.now() + 1).toString(), text: services[text].response, isUser: false, timestamp: new Date() };
        setMessages((prev) => [...prev, botMessage]);
        setQuickButtons(services[text].options || []);
        setIsTyping(false);
      }, 500);
      return;
    }

    if (responseText && link) {
      setTimeout(() => {
        const botMessage = { id: (Date.now() + 1).toString(), text: responseText, isUser: false, timestamp: new Date() };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
        setTimeout(() => navigate(link), 1000);
      }, 500);
      return;
    }

    try {
      const apiResponse = await sendMessageToAPI(text);
      const botMessage = { id: (Date.now() + 1).toString(), text: apiResponse.message || "🤔 I didn’t get that, try again.", isUser: false, timestamp: new Date() };
      setMessages((prev) => [...prev, botMessage]);
      setQuickButtons(apiResponse.suggestions || quickButtons);
      setIsTyping(false);
    } catch {
      const botMessage = { id: (Date.now() + 1).toString(), text: "⚠️ Something went wrong. Try again later.", isUser: false, timestamp: new Date() };
      setMessages((prev) => [...prev, botMessage]);
      setQuickButtons(apiResponse.suggestions || quickButtons);

      setIsTyping(false);
    }
  };

  // button click handler
  const handleQuickButtonClick = (btn) => {
    if (btn.action === "retry") {
      const lastUserMsg = messages.filter((m) => m.isUser).pop();
      if (lastUserMsg) handleSendMessage(lastUserMsg.text);
      return;
    }
    if (btn.response && btn.link) {
      handleSendMessage(btn.label, btn.link, btn.response);
    } else if (btn.link) {
      handleSendMessage(btn.label, btn.link);
      navigate(btn.link);
    } else {
      handleSendMessage(btn.label);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition">
          <MessageCircle className="text-white w-6 h-6" />
        </button>
      ) : (
        <div className="w-80 h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-blue-600 text-white">
            <div className="flex items-center space-x-2">
              <img src={chatbotAvatar} alt="Bot" className="w-8 h-8 rounded-full" />
              <div className="flex flex-col">
                <h2 className="text-sm font-semibold">Assistant</h2>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-xs opacity-75">{isConnected ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setIsOpen(false)}>
                <Minimize2 className="w-4 h-4" />
              </button>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-3">
            {messages.map(msg => (
              <div key={msg.id} className={`mb-2 flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${
                  msg.isUser ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-gray-500 text-xs">Bot is typing...</div>}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Quick Buttons */}
          {quickButtons.length > 0 && (
            <div className="flex flex-wrap gap-2 p-2">
              {quickButtons.map((btn, idx) => (
                <Button key={idx} onClick={() => handleQuickButtonClick(btn)} className="px-3 py-1 rounded-lg text-xs hover:scale-105 transition-transform">
                  {btn.label}
                </Button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t flex items-center space-x-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage(input)}
              placeholder="Type a message..."
              className="flex-1 resize-none rounded-lg"
              rows={1}
            />
            <button onClick={() => handleSendMessage(input)} className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
