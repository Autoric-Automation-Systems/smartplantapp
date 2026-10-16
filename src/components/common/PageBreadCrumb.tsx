import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  pageTitle: string;
  backUrl?: string;
  backUrlName?: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle, backUrl, backUrlName }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {pageTitle}
      </h2>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          {backUrl && (
            <li>
              <Link
                className="inline-flex min-h-8 items-center gap-1.5 rounded-md px-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                href={backUrl}
              >
                {backUrlName}
                <svg
                  className="stroke-current"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          )}
          <li className="text-sm text-gray-800 dark:text-white/90">
            {pageTitle}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
