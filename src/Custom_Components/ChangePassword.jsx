import React, { useState } from 'react'

import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { change_Password } from '../Services/AuthService'

export function ChangePassword() {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const email = localStorage.getItem('email');
    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Old Password:', oldPassword);
        console.log('New Password:', newPassword);
        console.log('Email:', email);

        // old and new Password should not be empty
        if (!oldPassword || !newPassword) {
            alert('Old password and new password cannot be empty');
            return;
        }

        // old password shouldn't be same as new password
        if (oldPassword === newPassword) {
            alert('Old password and new password cannot be same');
            return;
        }

        await change_Password({ email, oldPassword, newPassword }).then((response) => {
            console.log(response);
            setOldPassword('');
            setNewPassword('');
        });
    }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Update your password to keep your account secure.
          </DialogDescription>
        </DialogHeader>
              <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="oldPassword" className="text-right">
              Old Password
            </Label>
            <Input id="oldPassword" placeholder="********" className="col-span-3" value={oldPassword} onChange={handleOldPasswordChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newPassword" className="text-right">
              New Password
            </Label>
            <Input id="newPassword" placeholder="********" className="col-span-3" value={newPassword} onChange={handleNewPasswordChange} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
