import { useState, useEffect } from 'react';
import { Send, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { getDriverMessages, sendMessage, sendBulkMessage } from '@/services/driverService';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ChatPanel from '@/driver/components/ChatPanel';
import BulkMessage from '@/driver/components/BulkMessage';

const Messages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showBulkMessage, setShowBulkMessage] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await getDriverMessages(user.id);
      setMessages(response.data);
      if (response.data.length > 0) {
        setSelectedChat(response.data[0]);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSendMessage = async (messageText) => {
    try {
      await sendMessage({
        from: user.id,
        to: selectedChat.from.id,
        message: messageText,
      });
      toast.success('Message sent!');
      loadMessages();
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleBulkMessage = async (messageText) => {
    try {
      await sendBulkMessage({
        driverId: user.id,
        message: messageText,
      });
      toast.success('Message sent to all passengers!');
      setShowBulkMessage(false);
    } catch (error) {
      toast.error('Failed to send bulk message');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Messages
              </h1>
              <Button
                variant="primary"
                icon={<Users />}
                onClick={() => setShowBulkMessage(true)}
              >
                Broadcast Message
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Message List */}
              <div className="lg:col-span-1">
                <Card>
                  <h2 className="text-lg font-semibold mb-4">Conversations</h2>
                  <div className="space-y-2">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        onClick={() => setSelectedChat(msg)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat?.id === msg.id
                            ? 'bg-primary-100 border-2 border-primary-500'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {msg.from.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {msg.from.name}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              {msg.message}
                            </p>
                          </div>
                          {!msg.isRead && (
                            <div className="w-2 h-2 bg-primary-600 rounded-full" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Chat Panel */}
              <div className="lg:col-span-2">
                {selectedChat ? (
                  <ChatPanel
                    chat={selectedChat}
                    onSend={handleSendMessage}
                  />
                ) : (
                  <Card className="h-96 flex items-center justify-center">
                    <p className="text-gray-500">Select a conversation to start messaging</p>
                  </Card>
                )}
              </div>
            </div>

            {/* Bulk Message Modal */}
            {showBulkMessage && (
              <BulkMessage
                onSend={handleBulkMessage}
                onClose={() => setShowBulkMessage(false)}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
