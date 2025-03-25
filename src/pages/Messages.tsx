import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Search, Phone, Video, MoreVertical, User, Paperclip } from "lucide-react";

// Sample conversation data
const conversations = [
  {
    id: 1,
    agent: {
      id: 1,
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
      status: "online"
    },
    lastMessage: "Hi! I'm interested in showing you the waterfront property we discussed.",
    time: "12:45 PM",
    unread: 2,
  },
  {
    id: 2,
    agent: {
      id: 2,
      name: "Michael Rodriguez",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop",
      status: "offline"
    },
    lastMessage: "The owner agreed to your offer! Let's discuss next steps.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    agent: {
      id: 3,
      name: "Jennifer Chen",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop",
      status: "online"
    },
    lastMessage: "I've scheduled a viewing for the downtown loft this Saturday at 3 PM.",
    time: "Yesterday",
    unread: 0,
  }
];

// Sample messages for the active conversation
const messageHistory = [
  {
    id: 1,
    sender: "agent",
    text: "Hi there! I noticed you were interested in the waterfront property at 42 Marina Drive. Is there anything specific you'd like to know about it?",
    time: "11:30 AM"
  },
  {
    id: 2,
    sender: "user",
    text: "Yes, I'm very interested! I was wondering about the asking price and if there's any flexibility.",
    time: "11:45 AM"
  },
  {
    id: 3,
    sender: "agent",
    text: "The property is listed at $5.2 million, but the owners are motivated sellers and may consider reasonable offers. Would you like to schedule a viewing?",
    time: "12:00 PM"
  },
  {
    id: 4,
    sender: "user",
    text: "That would be great. I'm available this weekend, either Saturday afternoon or Sunday morning.",
    time: "12:15 PM"
  },
  {
    id: 5,
    sender: "agent",
    text: "Perfect! I can arrange a viewing for Saturday at 2 PM. Does that work for you? The property has an amazing sunset view from the back deck that you'll love!",
    time: "12:30 PM"
  },
  {
    id: 6,
    sender: "agent",
    text: "Hi! I'm interested in showing you the waterfront property we discussed. Are you still available this Saturday?",
    time: "12:45 PM"
  },
];

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredConversations = conversations.filter(convo => 
    convo.agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (messageText.trim() !== "") {
      // In a real app, this would send the message to the server
      // For now, we'll just clear the input
      setMessageText("");
    }
  };
  
  const currentAgent = conversations.find(convo => convo.id === activeConversation)?.agent;

  return (
    <>
      <Helmet>
        <title>Messages | EstateElite</title>
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Messages</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[calc(100vh-300px)]">
            {/* Conversation List */}
            <div className="md:col-span-1">
              <Card className="h-full">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder="Search conversations..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="overflow-y-auto max-h-[500px]">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <div 
                        key={conversation.id}
                        className={`flex items-center p-4 border-b cursor-pointer hover:bg-secondary/50 transition-colors ${activeConversation === conversation.id ? 'bg-secondary' : ''}`}
                        onClick={() => setActiveConversation(conversation.id)}
                      >
                        <div className="relative mr-3">
                          <img 
                            src={conversation.agent.image} 
                            alt={conversation.agent.name} 
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${conversation.agent.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-medium truncate">{conversation.agent.name}</h3>
                            <span className="text-xs text-muted-foreground">{conversation.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        </div>
                        {conversation.unread > 0 && (
                          <div className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No conversations found
                    </div>
                  )}
                </div>
              </Card>
            </div>
            
            {/* Chat Window */}
            <div className="md:col-span-2">
              <Card className="h-full flex flex-col">
                {activeConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b flex items-center justify-between">
                      <div className="flex items-center">
                        <img 
                          src={currentAgent?.image} 
                          alt={currentAgent?.name} 
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <h3 className="font-medium">{currentAgent?.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {currentAgent?.status === 'online' ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Phone className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Video className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
                      {messageHistory.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.sender === 'agent' && (
                            <img 
                              src={currentAgent?.image} 
                              alt={currentAgent?.name} 
                              className="h-8 w-8 rounded-full object-cover mr-2 self-end"
                            />
                          )}
                          <div 
                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                              message.sender === 'user' 
                                ? 'bg-primary text-primary-foreground rounded-tr-none' 
                                : 'bg-secondary rounded-tl-none'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {message.time}
                            </p>
                          </div>
                          {message.sender === 'user' && (
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center ml-2 self-end">
                              <User className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Message Input */}
                    <div className="p-4 border-t">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Paperclip className="h-5 w-5" />
                        </Button>
                        <Textarea 
                          placeholder="Type your message..." 
                          className="flex-1 min-h-[40px] resize-none"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button className="rounded-full" onClick={handleSendMessage} disabled={messageText.trim() === ""}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center">
                      <p className="text-muted-foreground">Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Messages;
