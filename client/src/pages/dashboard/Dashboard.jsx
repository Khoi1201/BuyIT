import React, { useEffect } from 'react'

const Dashboard = ({ setSelectTab }) => {

  useEffect(() => setSelectTab('dashboard'), [])
  return (
    <div>
      <span>Dashboard for statistic purpose</span>
    </div>
  )
}

export default Dashboard
