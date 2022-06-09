import Link from 'next/link';
import Image from 'next/image';

import { card, title } from './styles.module.css';
import { textMd, textWhite, textBold } from '../../styles/utils.module.css';

export default function Category({ data }) {
	return (
		<Link
			href={{
				pathname: `/search/${data.id}`,
				query: { genre: data.name },
			}}
		>
			<a>
				<div className={card}>
					<span className={`${textWhite} ${textBold} ${textMd} ${title}`}>
						{data.name}
					</span>
					<Image
						src={data.icons[0].url}
						alt='Category image'
						width='100%'
						height='100%'
						layout='responsive'
						objectFit='contain'
					></Image>
				</div>
			</a>
		</Link>
	);
}
