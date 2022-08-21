import Link from "next/link";
import md from 'markdown-it';

export default function project({ project }) {
    return (
        <div className="w-full h-full border border-gray-800 p-10 text-center transition duration-700 hover:bg-gray-800" itemScope itemType="https://schema.org/WebSite">
            <h3 className="font-normal py-0 text-primary mb-10" itemProp="name">{project.frontmatter.title}</h3>
            <div className="w-full text-center">
                {project.frontmatter.demo && ( 
                    <Link href={project.frontmatter.demo}>
                        <a target={"_blank"} className="w-fit px-5 py-2 mx-2 border border-white rounded-sm text-white hover:no-underline whitespace-nowrap hover:bg-white hover:text-black transition duration-500" itemProp="url">
                            Voir le site
                        </a>
                    </Link>
                )}
                {project.frontmatter.source && (
                    <Link href={project.frontmatter.source}>
                        <a target={"_blank"} className="w-fit px-5 py-2 mx-2 border border-white rounded-sm text-white hover:no-underline whitespace-nowrap hover:bg-white hover:text-black transition duration-500">
                            Code source
                        </a>
                    </Link>
                )}
                <div dangerouslySetInnerHTML={{ __html: md().render(project.content) }} itemProp="description" className="mt-10" />
            </div>
        </div>
      )
}