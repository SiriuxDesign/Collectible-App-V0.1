import { PieChart, BarChart } from 'lucide-react'

interface CollectionStatsProps {
  items: any[]
}

export function CollectionStats({ items }: CollectionStatsProps) {
  const seriesCount = items.reduce((acc, item) => {
    acc[item.series] = (acc[item.series] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topSeries = Object.entries(seriesCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  const totalValue = items.reduce((sum, item) => sum + (item.purchasePrice || 0), 0)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-bold text-lg text-gray-900 mb-4">Collection Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <PieChart size={18} />
            <span className="text-sm font-medium">Total Items</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{items.length}</div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <BarChart size={18} />
            <span className="text-sm font-medium">Total Value</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${totalValue.toFixed(2)}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-600 mb-2">Top Series</div>
          <div className="space-y-1">
            {topSeries.map(([series, count]) => (
              <div key={series} className="flex justify-between">
                <span className="text-gray-700 truncate max-w-[100px]">{series || 'Uncategorized'}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
