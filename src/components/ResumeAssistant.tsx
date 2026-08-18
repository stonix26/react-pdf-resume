import { useEffect, useRef } from 'react'
import { useResumeAssistant, type AssistantMessage } from '@/hooks/useResumeAssistant'
import {
  ArrowUpLine,
  DeleteBinLine,
  SparklesLine
} from '@/components/icons'
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  ScrollArea,
  Textarea
} from '@/components/ui'
import { cn } from '@/lib/utils'

function MessageBubble({ message }: { message: AssistantMessage }) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-xs/relaxed',
          isUser
            ? 'rounded-br-sm bg-primary text-primary-foreground'
            : 'rounded-bl-sm border border-border bg-muted text-foreground'
        )}
      >
        {message.content}
      </div>
    </div>
  )
}

export function ResumeAssistant() {
  const {
    open,
    setOpen,
    messages,
    input,
    setInput,
    status,
    sendMessage,
    generateResume,
    clearConversation
  } = useResumeAssistant()

  const scrollRef = useRef<HTMLDivElement>(null)
  const canSend = input.trim().length > 0 && status === 'idle'
  const busy = status !== 'idle'

  useEffect(() => {
    if (!open) return
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [open, messages, status])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (canSend) void sendMessage()
    }
  }

  return (
    <>
      <Button
        type='button'
        size='icon-lg'
        className='fixed bottom-24 right-6 z-40 size-12 rounded-full shadow-lg'
        onClick={() => setOpen(true)}
        aria-label='Open AI resume assistant'
        title='AI Resume Assistant'
      >
        <SparklesLine />
      </Button>

      <Drawer open={open} onOpenChange={setOpen} direction='bottom'>
        <DrawerContent className='mx-auto h-[min(70vh,42rem)] max-w-3xl data-[vaul-drawer-direction=bottom]:inset-x-auto'>
          <DrawerHeader className='border-b border-border pb-4'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <DrawerTitle>AI Resume Assistant</DrawerTitle>
                <DrawerDescription>
                  Chat with the assistant, then generate a resume to fill the
                  form.
                </DrawerDescription>
              </div>
              <Button
                type='button'
                size='icon-sm'
                variant='ghost'
                onClick={clearConversation}
                aria-label='Clear conversation'
                title='Clear conversation'
              >
                <DeleteBinLine />
              </Button>
            </div>
          </DrawerHeader>

          <ScrollArea className='min-h-0 flex-1 px-4'>
            <div className='flex flex-col gap-3 py-4'>
              {messages.map(message => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {busy ? (
                <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                  <SparklesLine className='animate-pulse' />
                  {status === 'generating'
                    ? 'Generating your resume…'
                    : 'Thinking…'}
                </div>
              ) : null}
              <div ref={scrollRef} className='h-px w-full' />
            </div>
          </ScrollArea>

          <div className='border-t border-border p-4'>
            <div className='flex items-end gap-2'>
              <Textarea
                value={input}
                onChange={event => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Describe your experience, skills, education…'
                className='min-h-16 max-h-40 flex-1'
                disabled={busy}
              />
              <Button
                type='button'
                size='icon-lg'
                disabled={!canSend}
                onClick={() => void sendMessage()}
                aria-label='Send message'
              >
                <ArrowUpLine />
              </Button>
            </div>
            <Button
              type='button'
              className='mt-3 w-full'
              disabled={busy}
              onClick={() => void generateResume()}
            >
              <SparklesLine />
              Generate Resume
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
