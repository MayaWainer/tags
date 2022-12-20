export interface Chunk {
  from: number
  to: number
}

export function toChunks(params: { chunkSize: number; totalSize: number }): Chunk[] {
  const { chunkSize, totalSize } = params
  if (!chunkSize || !totalSize) {
    return []
  }

  const chunks: Chunk[] = []

  if (chunkSize >= totalSize) {
    return [{ from: 0, to: totalSize }]
  }

  const chunksCount = Math.floor(totalSize / chunkSize)
  const chunksReminder = totalSize % chunkSize

  for (let i = 0; i < chunksCount; i++) {
    chunks.push({
      from: i * chunkSize,
      to: (i + 1) * chunkSize
    })
  }

  if (chunksReminder) {
    chunks.push({
      from: chunksCount * chunkSize,
      to: chunksCount * chunkSize + chunksReminder
    })
  }

  return chunks
}
