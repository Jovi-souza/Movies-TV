/* eslint-disable camelcase */
import { Path } from '../utils/imagesPath'

interface ProfileProps {
  name: string
  character: string
  profilePath: string
  knownForDepartment: string
}

export function CastCard({
  character,
  knownForDepartment,
  name,
  profilePath,
}: ProfileProps) {
  return (
    <div className="flex flex-col text-white">
      <div className="relative">
        <img src={`${Path}${profilePath}`} alt="Movie logo" />
        <div className="absolute left-1 bottom-1 text-xs px-4 rounded bg-gray-500 bg-opacity-60">
          {knownForDepartment}
        </div>
      </div>
      <div className="text-xs font-bold w-24 overflow-hidden whitespace-nowrap text-ellipsis">
        {name}
      </div>
      <div className="flex gap-2 text-xs">
        <span className="text-gray-400">{character}</span>
      </div>
    </div>
  )
}
