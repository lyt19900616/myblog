"use server"

import { signIn, signOut } from '@/auth'

export const githubSignIn = async () => {
  return signIn('github')
}

export const giteeSignIn = async () => {
  return signIn('gitee')
}

export const allSignOut = async () => {
  return signOut()
}