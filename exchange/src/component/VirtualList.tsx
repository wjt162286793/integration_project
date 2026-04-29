import React, { useEffect, useMemo, useRef, useState } from 'react'

type VirtualListProps<T> = {
  items: T[]
  itemHeight: number
  overscan?: number
  className?: string
  style?: React.CSSProperties
  getKey?: (item: T, index: number) => React.Key
  renderItem: (item: T, index: number) => React.ReactNode
}

const VirtualList = <T,>({
  items,
  itemHeight,
  overscan = 6,
  className,
  style,
  getKey,
  renderItem
}: VirtualListProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => setViewportHeight(el.clientHeight)
    update()

    const ro = new ResizeObserver(() => update())
    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  const totalHeight = items.length * itemHeight
  const range = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight)
    const visibleCount = Math.ceil(viewportHeight / itemHeight)
    const from = Math.max(0, start - overscan)
    const to = Math.min(items.length, start + visibleCount + overscan)
    const offsetY = from * itemHeight
    return { from, to, offsetY }
  }, [items.length, itemHeight, overscan, scrollTop, viewportHeight])

  const visible = useMemo(() => items.slice(range.from, range.to), [items, range.from, range.to])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ overflow: 'auto', position: 'relative', height: '100%', ...style }}
      onScroll={(e) => setScrollTop((e.currentTarget as HTMLDivElement).scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: range.offsetY, left: 0, right: 0 }}>
          {visible.map((item, index) => {
            const realIndex = range.from + index
            const key = getKey ? getKey(item, realIndex) : realIndex
            return (
              <div key={key} style={{ height: itemHeight }}>
                {renderItem(item, realIndex)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VirtualList
