import { Button } from "@/components/ui/button";
import { Art } from "@/components/ui/art";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-lg px-4 py-24 text-center">
      <Art src="/mascot/armful.png" alt="" className="mx-auto h-52 w-52" sizes="208px" />
      <h1 className="mt-6 font-accent text-5xl font-bold text-brand">404</h1>
      <h2 className="mt-2 text-2xl font-semibold text-ink">ไม่พบหน้านี้</h2>
      <p className="mt-3 text-ink-soft">
        ขออภัย หน้าที่คุณกำลังหาอาจถูกย้ายหรือไม่มีอยู่แล้ว
      </p>
      <div className="mt-7 flex justify-center">
        <Button href="/" size="lg">
          กลับหน้าแรก
        </Button>
      </div>
    </section>
  );
}
