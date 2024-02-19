import { ToastAction } from "@radix-ui/react-toast"
import { Button } from "../components/ui/button"
import { useToast } from "../components/ui/use-toast"

export const ToastDemo = () => {
    const { toast } = useToast()
  
    return (
      <Button
        onClick={() => {
                toast({
            variant: "destructive",
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }}
      >
        Show Toast
      </Button>
    )
  }
  