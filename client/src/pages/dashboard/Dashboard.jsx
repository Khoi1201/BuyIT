import React, { useEffect } from 'react'

const Dashboard = ({ setSelectTab }) => {
  useEffect(() => setSelectTab('dashboard'), [])
  return (
    <div style={{ height: '100vh' }}>
      <span>Dashboard for statistic purpose</span>
    </div>
  )
}

export default Dashboard
