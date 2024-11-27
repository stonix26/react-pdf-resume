import React from 'react'
import { Form } from '../ui/form'
import Header from './Header'
import HeaderLinks from './HeaderLinks'
import Summary from './Summary'
import Experiences from './Experiences'
import AdditionalSkills from './AdditionalSkills'
import Education from './Education'
import { Button } from '../ui/button'
import Portfolios from './Portfolios'
import References from './References'
import FilePdfLine from '../icons/file-pdf-line'
import ExportLine from '../icons/export-line'
import DeleteBinLine from '../icons/delete-bin-line'
import Github from '../icons/github'
import { UseResumeReturnType } from '@/hooks/useResume'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'

const MainForm: React.FC<Omit<UseResumeReturnType, 'storedData'>> = ({
  form,
  onSubmit,
  handleResetData,
  handleExport
}) => {
  const { control } = form
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='relative flex flex-col flex-1 p-4 pb-0 overflow-auto space-y-6'
      >
        <div className='flex justify-between gap-4'>
          <Button variant='secondary' asChild>
            <a
              href='https://github.com/stonix26/react-pdf-resume'
              target='_blank'
            >
              <Github /> Source Code
            </a>
          </Button>
          <div className='flex gap-4'>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive'>
                  <DeleteBinLine /> Reset Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your data in localStorage. Please ensure to export your data
                    first before continuing this action.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetData}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button onClick={handleExport} variant='secondary'>
              <ExportLine />
              Export Data
            </Button>
          </div>
        </div>
        <Header control={control} />
        <HeaderLinks control={control} />
        <Summary control={control} />
        <Experiences control={control} />
        <AdditionalSkills control={control} />
        <Education control={control} />
        <Portfolios control={control} />
        <References control={control} />
        <Button
          type='submit'
          className='sticky w-auto max-w-fit bottom-2 left-1/2 -translate-x-1/2'
        >
          <FilePdfLine />
          Preview PDF
        </Button>
      </form>
    </Form>
  )
}

export default MainForm
