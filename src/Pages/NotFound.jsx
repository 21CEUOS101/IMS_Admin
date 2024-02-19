import { useToast } from '../components/ui/use-toast';
import { Button } from '../components/ui/button'
import React from 'react'
import { AlertDialogM } from '../Custom_Components/AlertDialogM';
import DemoCard from '../Custom_Components/DemoCard';

function NotFound() {

    const toast = useToast();
  return (
      <div>
          <AlertDialogM >
          </AlertDialogM>
          <DemoCard />
      </div>
  )
}

export default NotFound