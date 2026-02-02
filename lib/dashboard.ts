type DashboardMetrics = {
    gamesAnalyzed: number
    gamesDelta: number
    topEdge: {
      percentage: number
      matchup: string
    }
    modelAccuracy: {
      value: number
      delta: number
    }
  }
  
  export async function getDashboardMetrics(
    season: number,
    week: number
  ): Promise<DashboardMetrics> {
    const res = await fetch(
      `http://185.193.17.89:7000/api/analysis?season=${season}&week=${week}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`, // if needed
        },
        cache: 'no-store', // dashboard should be fresh
      }
    )
  
    if (!res.ok) {
      throw new Error('Failed to fetch dashboard metrics')
    }
  
    return res.json()
  }
  