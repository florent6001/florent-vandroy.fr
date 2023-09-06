import Link from "next/link";
import md from "markdown-it";

export default function project({ project }) {
  return (
    <div
      className="w-full project h-full"
      itemScope
      itemType="https://schema.org/WebSite"
    >
      <div data-aos="zoom-in" className="flex justify-between flex-col p-5 h-full border border-gray-600 dark:border-white rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-700">
        <div className="w-full">
          <h3 className="font-normal py-0" itemProp="name">
            {project.frontmatter.title}
          </h3>
          <div className="flex lg:flex-row gap-2 my-4">
            {project.frontmatter.demo && (
              <Link
                title="Voir le projet"
                href={project.frontmatter.demo}
                target={"_blank"}
                className="btn btn-primary"
                itemProp="url"
              >
                Voir le site
              </Link>
            )}
            {project.frontmatter.source && (
              <Link
                title="Voir le code source du projet"
                href={project.frontmatter.source}
                target={"_blank"}
                className="btn btn-primary"
              >
                Code source
              </Link>
            )}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: md().render(project.content) }}
            itemProp="description"
          />
        </div>
      </div>
    </div>
  );
}
