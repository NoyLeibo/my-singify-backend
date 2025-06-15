const nameValidation = (nickName: string): string | null => {
  if (nickName.length < 3) {
    return 'Nickname must be at least 3 characters'
  }
  if (nickName.length > 16) {
    return 'Nickname must be at maximum 16 characters'
  }
  return null
}

const emailValidation = (email: string): string | null => {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailRegex.test(email) ? null : 'Invalid email'
}

const passwordValidation = (password: string): string | null => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters'
  }
  if (password.length > 16) {
    return 'Password must be at maximum 16 characters'
  }
  return null
}

export const validationHelper = {
  nameValidation,
  emailValidation,
  passwordValidation,
}
