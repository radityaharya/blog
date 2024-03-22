import dynamic from 'next/dynamic'
import { FaCode } from 'react-icons/fa'

const altNames = {
  dockerfile: 'docker',
  html: 'html5',
  css: 'css3',
  mdx: 'markdown',
  scss: 'sass'
}

const overrideNames = {
  bash: 'Gnubash',
  shell: 'Gnubash',
  adguardhome: 'AdGuard'
}

const DynamicDevIcon = ({ name , ...props }) => {
  name = name.replace(/ /g, '').toLowerCase()
  name = altNames[name] ? altNames[name] : name
  name = name.charAt(0).toUpperCase() + name.slice(1)
  if (overrideNames[name.toLowerCase()]) {
    name = overrideNames[name.toLowerCase()]
  }

  const loadIcon = async () => {
    try {
      const Icons = await import('react-icons/di')
      if (Icons['Di' + name]) {
        return Icons['Di' + name];
      }
      const SiIcons = await import('react-icons/si')
      if (SiIcons['Si' + name]) {
        return SiIcons['Si' + name];
      }
    } catch (error) {
      console.error(error);
    }
    return FaCode;
  }

  const IconComponent = dynamic(loadIcon, {
    loading: () => <FaCode {...props} />,
  });

  return <IconComponent {...props} />
}

export default DynamicDevIcon