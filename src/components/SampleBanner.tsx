import { SparklesLine } from '@/components/icons'
import { Button, Card, CardContent } from '@/components/ui'

type SampleBannerProps = {
  onLoadSample: () => void
}

export function SampleBanner({ onLoadSample }: SampleBannerProps) {
  return (
    <Card>
      <CardContent className='flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm font-medium'>New here?</p>
          <p className='text-xs text-muted-foreground'>
            Start from a sample resume and preview the PDF right away, then make
            it your own.
          </p>
        </div>
        <Button
          type='button'
          variant='secondary'
          className='max-w-fit'
          onClick={onLoadSample}
        >
          <SparklesLine /> Load sample resume
        </Button>
      </CardContent>
    </Card>
  )
}