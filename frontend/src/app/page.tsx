"use client";

import { Navbar, NFTCard, NFTCardSkeleton, SearchBar, RarityFilter, SortSelect, StatsHub } from "@/components";
import { useAllActiveListings, useMarketplaceFilters } from "@/hooks";
import { calculateMarketStats } from "@/lib/stats";

export default function HomePage() {
  const { listings, isLoading } = useAllActiveListings();
  const marketStats = calculateMarketStats(listings);
  const {
    searchQuery,
    setSearchQuery,
    rarityFilter,
    setRarityFilter,
    sortBy,
    setSortBy,
    filterAndSort,
  } = useMarketplaceFilters();

  const filteredListings = filterAndSort(listings);
  const listingCount = listings.length;

  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:gap-10 md:py-10">
        <section className="section-shell glass-surface overflow-hidden rounded-[2rem] px-6 py-8 md:px-8 md:py-10 lg:px-10">
          <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-cyan-300/12 blur-3xl" />
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-end">
            <div className="space-y-6">
              <span className="eyebrow">Collectible Marketplace</span>
              <div className="space-y-4">
                <h1
                  className="max-w-3xl text-5xl font-semibold md:text-6xl lg:text-[4.6rem]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Discover drops with <span className="text-gradient">clean pricing</span> and instant Celo settlement
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-200/85 md:text-lg">
                  cnMarket turns rarity-based NFT trading into a calmer, faster experience with USDm pricing,
                  mobile-friendly wallet flows, and a storefront that feels built for collectors.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/mint"
                  className="button-shine rounded-full bg-gradient-to-r from-emerald-300 via-[var(--mint-1)] to-cyan-300 px-6 py-3 text-sm font-semibold text-[#083532] transition hover:brightness-105"
                >
                  Mint a New Drop
                </a>
                <a
                  href="/my-nfts"
                  className="rounded-full border border-emerald-100/14 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View My Collection
                </a>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Pricing", value: "USDm-first", note: "clear stablecoin pricing" },
                  { label: "Wallets", value: "MiniPay + web", note: "mobile and desktop ready" },
                  { label: "Drops", value: "3 rarity tiers", note: "common to legendary" },
                ].map((item) => (
                  <div key={item.label} className="rounded-[1.4rem] border border-emerald-100/12 bg-white/5 p-4">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
                    <p className="mt-3 text-xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-300">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="feature-card rounded-[1.75rem] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Market Pulse</p>
                <p className="mt-4 text-4xl font-semibold text-white">{listingCount}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Active listings currently visible from the on-chain marketplace contract.
                </p>
              </div>
              <div className="feature-card rounded-[1.75rem] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Network</p>
                <p className="mt-4 text-4xl font-semibold text-white">Celo</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Fast confirmations, wallet-friendly UX, and predictable collectible transactions.
                </p>
              </div>
              <div className="feature-card rounded-[1.75rem] p-5 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Rarity Ladder</p>
                    <p className="mt-4 text-2xl font-semibold text-white">Common, Rare, Legendary</p>
                  </div>
                  <div className="animate-float-slow rounded-full border border-emerald-100/12 bg-emerald-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                    Live
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-gradient-to-br from-slate-300/16 to-slate-500/14 p-4">
                    <p className="text-sm font-semibold text-white">Common</p>
                    <p className="mt-1 text-sm text-slate-300">0.01 USDm</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-blue-300/18 to-purple-500/12 p-4">
                    <p className="text-sm font-semibold text-white">Rare</p>
                    <p className="mt-1 text-sm text-slate-300">0.03 USDm</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-amber-200/18 to-orange-500/14 p-4">
                    <p className="text-sm font-semibold text-white">Legendary</p>
                    <p className="mt-1 text-sm text-slate-300">0.05 USDm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Collector-friendly pricing",
              body: "Every rarity level is priced in USDm so collectors are reading stable prices, not guessing token volatility.",
            },
            {
              title: "Designed for fast wallets",
              body: "The flow is optimized for MiniPay and modern injected wallets, with fewer rough edges across mobile and desktop.",
            },
            {
              title: "On-chain by default",
              body: "Listings, ownership, rarity, and transfers are pulled from contracts directly for a transparent marketplace view.",
            },
          ].map((item) => (
            <div key={item.title} className="feature-card rounded-[1.6rem] p-5">
              <p className="text-lg font-semibold text-white">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
            </div>
          ))}
        </section>

        <StatsHub stats={marketStats} />

        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Marketplace Feed</span>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Active listings ready to collect
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              Browse what is already listed on-chain, compare rarity at a glance, and jump into each asset with a cleaner detail flow.
            </p>
          </div>
          <div className="hidden rounded-full border border-emerald-100/12 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 md:inline-flex">
            {listingCount} live listings
          </div>
        </section>

        {/* Filters and Search Bar Section */}
        <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-[1.75rem] border border-emerald-100/10 bg-white/5 p-5">
          <div className="flex-1 lg:max-w-md">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <RarityFilter selected={rarityFilter} onChange={setRarityFilter} />
            <SortSelect value={sortBy} onChange={setSortBy} />
          </div>
        </section>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <NFTCardSkeleton key={i} />
            ))}
          </div>
        ) : listingCount === 0 ? (
          <div className="section-shell glass-surface rounded-[2rem] border border-emerald-100/10 px-6 py-20 text-center">
            <p className="mb-4 text-5xl">🏪</p>
            <p className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              No listings yet
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              The market is quiet right now. Mint the first drop, list it, and set the tone for the rest of the collection.
            </p>
            <a
              href="/mint"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-6 py-3 text-sm font-semibold text-[#073532] transition hover:brightness-105"
            >
              Mint your first NFT
            </a>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="section-shell glass-surface rounded-[2rem] border border-emerald-100/10 px-6 py-16 text-center">
            <p className="mb-4 text-4xl">🔍</p>
            <p className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              No matching listings found
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-300">
              We couldn't find any listings matching "{searchQuery}" or selected filters. Try broadening your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setRarityFilter(null);
              }}
              className="mt-6 inline-flex rounded-full border border-emerald-100/14 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white/10"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <NFTCard
                key={listing.tokenId.toString()}
                tokenId={listing.tokenId}
                rarity={listing.rarity}
                price={listing.price}
                seller={listing.seller}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
