import React from 'react'
import { FiBell, FiPieChart, FiRefreshCw, FiBook } from 'react-icons/fi'

const cardData = [
  {
    id: 1,
    title: 'Set Payment Reminders',
    description: 'Enable email/SMS alerts to never miss a due date.',
    icon: <FiBell className="w-6 h-6 text-yellow-500" />
  },
  {
    id: 2,
    title: 'Monitor Utilization',
    description: 'Aim to keep utilization below 30% for optimal scoring.',
    icon: <FiPieChart className="w-6 h-6 text-green-500" />
  },
  {
    id: 3,
    title: 'Run Credit Simulations',
    description: 'Experiment with payment scenarios to see score impact.',
    icon: <FiRefreshCw className="w-6 h-6 text-blue-500" />
  },
  {
    id: 4,
    title: 'Visit Education Hub',
    description: 'Read articles & videos on building credit responsibly.',
    icon: <FiBook className="w-6 h-6 text-indigo-500" />
  }
]

export default function ActionCards() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {cardData.map(({ id, title, description, icon }) => (
        <div
          key={id}
          className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition"
        >
          <div className="mt-1">{icon}</div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">{title}</h3>
            <p className="mt-1 text-gray-600">{description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
