import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
  CheckIcon,
  BarsArrowDownIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";

const Icon = ({ name, classNames }: { name: string; classNames?: string }) => {
  const className = { className: `text-black dark:text-white ${classNames}` };

  switch (name) {
    case "Search":
      return <MagnifyingGlassIcon {...className} />;
    case "ArrowLeft":
      return <ArrowLeftIcon {...className} />;
    case "ChevronLeft":
      return <ChevronLeftIcon {...className} />;
    case "ChevronRight":
      return <ChevronRightIcon {...className} />;
    case "Heart":
      return <HeartIcon {...className} />;
    case "More":
      return <EllipsisVerticalIcon {...className} />;
    case "XMark":
      return <XMarkIcon {...className} />;
    case "Check":
      return <CheckIcon {...className} />;
    case "BarsArrowDown":
      return <BarsArrowDownIcon {...className} />;
    case "Grid":
      return <Squares2X2Icon {...className} />;
    case "List":
      return <ListBulletIcon {...className} />;
    default:
      return;
  }
};

export { Icon };
