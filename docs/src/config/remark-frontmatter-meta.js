import { matter } from "vfile-matter"

export default function remarkFrontmatterMeta() {
  return function (_, file) {
    matter(file)
  }
}
