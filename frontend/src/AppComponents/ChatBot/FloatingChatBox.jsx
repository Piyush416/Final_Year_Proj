import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { ScrollArea } from '../../components/ui/scroll-area';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import chatbotAvatar from "../../assets/chatbotAvatar.jpeg";
import axios from "axios";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hi! 👋 I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);
  const scrollAreaRef = useRef(null);

  const handleToggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // User message
    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // 🔥 Call your backend API
      const response = await axios.post("/api/query", {
        query: userMessage.text
      });

      console.log(response.data.answer)

      // Bot response from server
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response.data.answer || "⚠️ No response from server.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage = {
        id: (Date.now() + 2).toString(),
        text: "❌ Failed to reach the server. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-96 h-[32rem] bg-card border border-border rounded-2xl shadow-2xl backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-chatbot-primary to-chatbot-secondary rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={chatbotAvatar} 
                  alt="Chatbot" 
                  className="w-8 h-8 rounded-full bg-white p-1"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse-slow"></div>
              </div>
              <div>
                <h3 className="font-semibold text-sm">AI Assistant</h3>
                <p className="text-xs">Online</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleOpen}
                className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
              >
                <Minimize2 color='black' className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleOpen}
                className="h-8 w-8 hover:bg-white/20 rounded-full scale-110"
              >
                <X color='black' className="h-4 w-4 hover:scale-110" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="h-80 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      message.isUser
                        ? 'bg-chat-bubble-user rounded-br-md'
                        : 'bg-chat-bubble-bot text-foreground rounded-bl-md border border-border'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isUser ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-chat-bubble-bot border border-border px-4 py-2 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Section */}
          <div className="p-4 border-t border-border bg-chat-input rounded-b-2xl">
            <div className="flex gap-2 items-end">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="min-h-[2.5rem] max-h-32 resize-none bg-background border-input focus:border-chatbot-primary transition-colors"
                rows={1}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-chatbot-primary to-chatbot-secondary hover:from-chatbot-primary/90 hover:to-chatbot-secondary/90 rounded-xl h-10 w-10 p-0 transition-all duration-200 hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <Button
        onClick={handleToggleOpen}
        className={`h-16 w-16 rounded-full bg-gradient-to-br bg-blue-400
           shadow-[0_10px_20px_rgba(0,0,0,0.25)] backdrop-blur-md border border-white/20
          transition-transform duration-1000 ease-in-out transform hover:scale-110 active:scale-95 ${
            isOpen ? 'rotate-180' : 'animate-bounce-gentle'
          }`}
      >
        {isOpen ? (
          <X className="h-7 w-7 text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageCircle className="h-7 w-7 text-white" />
          </div>
        )}
      </Button>
    </div>
  );
};

export default FloatingChatbot;
