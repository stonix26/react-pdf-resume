import { useEffect, useState } from 'react'
import { Button, Input } from '@/components/ui'
import { ImageRemoveLine, ImageUploadLine } from '@/components/icons'

type ImageUploadInputProps = {
  value: File | string | undefined
  onChange: (value: File | undefined) => void
  accept?: string
}

export function ImageUploadInput({
  value,
  onChange,
  accept = 'image/*'
}: ImageUploadInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [inputKey, setInputKey] = useState(0)

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null)
      return
    }
    if (typeof value === 'string') {
      setPreviewUrl(value)
      return
    }

    const objectUrl = URL.createObjectURL(value)
    setPreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [value])

  const handleRemove = () => {
    onChange(undefined)
    setInputKey(key => key + 1)
  }

  return (
    <div className='space-y-2'>
      {previewUrl ? (
        <div className='flex items-center gap-3'>
          <img
            src={previewUrl}
            alt='Image preview'
            className='size-14 rounded-md border border-border object-cover'
          />
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={handleRemove}
          >
            <ImageRemoveLine /> Remove
          </Button>
        </div>
      ) : (
        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
          <ImageUploadLine className='size-4' />
          <span>Upload a JPG, PNG, or WebP image.</span>
        </div>
      )}
      <Input
        key={inputKey}
        type='file'
        accept={accept}
        aria-label='Choose an image'
        onChange={e => {
          const file = e.target.files?.[0] || null
          onChange(file ?? undefined)
        }}
      />
    </div>
  )
}

export default ImageUploadInput