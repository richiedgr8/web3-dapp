"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Video, Phone } from 'lucide-react'
import Layout from '@/components/Layout'

export default function ChatsPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alice', content: 'Hey, how\'s your project going?', timestamp: '2h ago' },
    { id: 2, sender: 'You', content: 'It\'s going well! Just finished the first phase.', timestamp: '1h ago' },
  ])

  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'You', content: newMessage, timestamp: 'Just now' }])
      setNewMessage('')
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Chats</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Chat with Alice</span>
              <div>
                <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 ${message.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                    <Avatar>
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`bg-primary text-primary-foreground p-2 rounded-lg ${message.sender === 'You' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                      <p>{message.content}</p>
                      <p className="text-xs opacity-50">{message.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
                placeholder="Type a message..." 
              />
              <Button type="submit">Send</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}