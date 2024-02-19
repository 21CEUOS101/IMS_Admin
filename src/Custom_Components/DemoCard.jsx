import React from 'react'

function DemoCard() {
  return (
    <div className="flex flex-col gap-2 p-4 pt-0">
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">Hi</div>
                  HI
                </div>
                <div
                  className="text-foreground"
                >
                  HI
                </div>
              </div>
              <div className="text-xs font-medium">"Hi</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              Hi
            </div>
      </div>
  )
}

export default DemoCard