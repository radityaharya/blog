import Image from './Image'
import Link from './Link'
import { Badge } from './ui/badge'
import icons from 'app/devicon.json'
import 'devicon/devicon.min.css'

const availableIcons = icons.map((icon) => icon.name)

const altNames = {
  dockerfile: 'docker',
  html: 'html5',
  css: 'css3',
  shell: 'bash',
  mdx: 'markdown',
  scss: 'sass'
}

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
  topics?: string[]
  language?: string
  fork?: boolean
  fork_parent?: string
  languages?: string[]
}

const Card = ({
  title,
  description,
  imgSrc,
  href,
  topics = [],
  language,
  fork,
  fork_parent,
  languages
}: CardProps) => (
  <div className="w-full h-full p-4 px-0 sm:px-4">
    <div
      className={`${
        imgSrc && 'h-full'
      }  h-full overflow-hidden rounded-md border-2 border-primary-200 border-opacity-60 dark:border-primary-700`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6 h-full flex flex-col justify-start">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <div className="flex flex-col gap-2 flex-grow">
          {fork && fork_parent && (
            <div className="text-xs font-medium text-primary-500 dark:text-primary-400">
              Forked from
              <span className="ml-1">
                <Link
                  href={fork_parent}
                  aria-label={`Forked from ${fork_parent}`}
                  rel={'noopener noreferrer'}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 underline"
                >
                  {fork_parent}
                </Link>
              </span>
            </div>
          )}
          <p className="prose line-clamp-2 max-w-none text-primary-500 dark:text-primary-400">
            {description}
          </p>
          {((topics && topics.length > 0) || language) && (
            <div className="prose mb-3 flex flex-wrap gap-2 text-base">
              {languages?.map((language) => (
                <Link
                  key={language}
                  href={`https://github.com/topics/${language}`}
                  aria-label={`Github link to ${language}`}
                  rel={'noopener noreferrer'}
                  suppressHydrationWarning
                  className="no-underline"
                >
                  <Badge
                    key={language}
                    variant="secondary"
                    className="bg-primary-200 dark:bg-primary-700 text-primary-800 dark:text-primary-200 h-full flex items-center gap-1"
                  >
                    {(availableIcons.includes(language.toLowerCase()) ||
                      altNames[language.toLowerCase()]) && (
                      <span className="flex items-center">
                        <i
                          className={`devicon-${
                            altNames[language.toLowerCase()] || language.toLowerCase()
                          }-plain text-xs align-middle max-h-5`}
                        />
                      </span>
                    )}
                    {language}
                  </Badge>
                </Link>
              ))}
              {topics.map((topic) => (
                <Link
                  key={topic}
                  href={`https://github.com/topics/${topic}`}
                  aria-label={`Github link to ${topic}`}
                  rel={'noopener noreferrer'}
                >
                  <Badge key={topic} variant="secondary" className="h-full">
                    {topic}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="text-base mt-3 font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
