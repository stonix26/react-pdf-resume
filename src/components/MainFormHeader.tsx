import { useRef, useState } from 'react'
import type { ImportResult } from '@/lib/import-resume'
import {
  DeleteBinLine,
  ExportLine,
  Github,
  ImportLine
} from '@/components/icons'
import { ThemeSwitcher } from '@/components/theme-switcher'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Input
} from '@/components/ui'

type MainFormHeaderProps = {
  onReset: () => void
  onExport: () => void
  onImport: (file: File) => Promise<ImportResult>
  onImported: () => void
}

export function MainFormHeader({
  onReset,
  onExport,
  onImport,
  onImported
}: MainFormHeaderProps) {
  const [resetConfirm, setResetConfirm] = useState('')
  const [importError, setImportError] = useState<{
    title: string
    details: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    const result = await onImport(file)

    if (!result.ok) {
      setImportError({ title: result.title, details: result.details })
      return
    }

    onImported()
  }

  return (
    <header className='flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4'>
      <Button variant='secondary' asChild>
        <a
          href='https://github.com/stonix26/react-pdf-resume'
          target='_blank'
          rel='noreferrer'
        >
          <Github /> Source Code
        </a>
      </Button>
      <div className='flex flex-wrap items-center gap-2'>
        <ThemeSwitcher />
        <AlertDialog
          onOpenChange={open => {
            if (!open) setResetConfirm('')
          }}
        >
          <AlertDialogTrigger asChild>
            <Button type='button' variant='destructive'>
              <DeleteBinLine /> Reset Data
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete your
                resume data stored in this browser. Please export your data
                first before continuing.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input
              value={resetConfirm}
              onChange={e => setResetConfirm(e.target.value)}
              placeholder='Type "reset" to confirm'
              aria-label='Type reset to confirm'
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={resetConfirm.trim().toLowerCase() !== 'reset'}
                onClick={() => {
                  setResetConfirm('')
                  onReset()
                }}
              >
                Reset everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          type='button'
          onClick={() => void onExport()}
          variant='secondary'
        >
          <ExportLine />
          Export Data
        </Button>
        <Button type='button' onClick={handleImportClick} variant='secondary'>
          <ImportLine />
          Import Data
        </Button>
        <input
          ref={fileInputRef}
          type='file'
          accept='application/json,.json'
          className='hidden'
          aria-label='Import resume JSON file'
          onChange={handleFileChange}
        />
        <AlertDialog
          open={importError !== null}
          onOpenChange={open => {
            if (!open) setImportError(null)
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{importError?.title}</AlertDialogTitle>
              <AlertDialogDescription className='whitespace-pre-wrap font-mono text-xs'>
                {importError?.details}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setImportError(null)}>
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  )
}