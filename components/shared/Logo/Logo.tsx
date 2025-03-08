import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/logo.svg'
import mobileLogo from '@/public/mobile-logo.svg'

type Props = {
    className?: string
    loading?: 'lazy' | 'eager'
}

const Logo = (props: Props) => {
    const { className, loading = 'lazy' } = props
    const title = 'Home'

    return (
        <Link className={className} href={'/'} title={title} aria-label={title}>
            <Image className="hidden sm:inline-block" src={logo} alt="" loading={loading} />
            <Image className="sm:hidden inline-block" src={mobileLogo} alt="" loading={loading} />
        </Link>
    )
}

export default Logo
