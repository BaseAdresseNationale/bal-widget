import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedPageProps {
  style?: React.CSSProperties
  children: React.ReactNode
  animation?: 'prev' | 'next'
}

function AnimatedPage({
  style = { padding: 10 },
  children,
  animation = 'next',
}: AnimatedPageProps) {
  return (
    <motion.div
      initial={{ transform: animation === 'next' ? 'translateX(100%)' : 'translateX(-100%)' }}
      animate={{ transform: 'translateX(0)' }}
      transition={{ duration: 0.5 }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedPage
