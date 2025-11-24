// Impor tipe data yang baru kita buat
import { Timeline } from "@/types/Timeline"

// Komponen ini menerima satu 'item' dari data journey kita sebagai prop
export default function TimelineItem({ item }: { item: Timeline }) {
  return (
    <div className="mx-auto min-h-screen w-full">
      <div className="sticky top-1/3">
        <div className="flex items-center">
          <div className="hidden w-25 text-xl md:block">
            {/* Ganti teks statis dengan data dinamis */}
            <p
              dangerouslySetInnerHTML={{
                __html: item.yearRange.replace(" - ", "<br />"),
              }}
            ></p>
          </div>
          <div className="absolute left-0 size-5 -translate-x-1/2 rounded-full border border-black bg-white md:left-25"></div>
          <p className="teks-base pl-5 font-semibold break-all text-sky-500 md:pl-10 md:text-lg">
            {item.dateRange}
          </p>
        </div>

        <div className="w-full pl-0 md:w-3/4 md:pl-25">
          <h4 className="w-full pl-5 text-xl font-medium break-all md:pl-10 md:text-3xl">
            {item.company}
          </h4>
          <div className="w-full pt-2 pl-5 md:pl-10">
            <ul className="list-disc pl-5">
              <li>
                <strong className="text-lg font-medium break-all text-sky-500 lg:text-xl">
                  {item.role}
                </strong>
                <ul className="ml-5 list-disc">
                  <li className="xs:break-normal max-w-full text-sm break-all md:text-lg">
                    {item.description}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
