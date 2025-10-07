import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/10 mt-24">{/* divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <p className="font-semibold">Discover Morocco</p>
          <p className="text-sm mt-2 text-black/70">
            Inspiring journeys through Morocco’s cities, deserts, and mountains.
          </p>
          <div className="flex items-center gap-3 mt-4 text-black/70">
            <a className="hover:text-brand" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <a className="hover:text-brand" href="https://x.com" target="_blank" rel="noreferrer" aria-label="X / Twitter">
              <FaXTwitter size={18} />
            </a>
            <a className="hover:text-brand" href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube size={18} />
            </a>
          </div>
        </div>

        <div>
          <p className="font-semibold">About Morocco</p>
          <ul className="mt-2 space-y-2 text-sm text-black/80">
            <li><a className="hover:text-brand" href="#destinations">Top Destinations</a></li>
            <li><a className="hover:text-brand" href="#culture">Culture & Cuisine</a></li>
            <li><a className="hover:text-brand" href="#blog">Travel Guides</a></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold">Contact</p>
          <ul className="mt-2 space-y-2 text-sm text-black/80">
            <li><a className="hover:text-brand" href="mailto:hello@example.com">hello@example.com</a></li>
            <li><a className="hover:text-brand" href="#plan">Partner with us</a></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold">Newsletter</p>
          <p className="text-sm mt-2 text-black/70">Get trip ideas and new guides.</p>
          <form className="mt-3 flex gap-2" action="/api/newsletter" method="POST">
            <input name="email" type="email" required placeholder="Your email"
                   className="flex-1 rounded-full border border-black/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand" />
            <button className="btn-primary h-10">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="text-center text-xs text-black/60 py-6">© {new Date().getFullYear()} Discover Morocco</div>
    </footer>
  );
}
