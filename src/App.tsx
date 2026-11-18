import React, { useState } from 'react';
import {
  Home,
  Star,
  Settings,
  Menu,
  X,
  Check,
  Printer,
  Copy,
  LayoutGrid,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface TraineeField {
  label: string;
  value: string;
  tabular?: boolean;
}

const PRIMARY_FIELDS: TraineeField[] = [
  { label: 'Roll No', value: 'R150810233736', tabular: true },
  { label: 'Name', value: 'MOHAMMAD AFJAL KHAN' },
  { label: 'Father Name', value: 'MOHAMMAD NIJAMUDDIN KHAN' },
  { label: 'Trade Code', value: '231', tabular: true },
  { label: 'Trade Name', value: 'Electrician' },
  { label: 'Admission Year', value: '2023', tabular: true },
  { label: 'Date of Birth', value: '12-JUNE-2007', tabular: true },
  { label: 'ITI Code', value: 'PR10000718', tabular: true },
  { label: 'ITI Name', value: 'Modern Bahudesiya private ITI' },
  { label: 'ITI Address', value: 'Near Shahid Petrol pump,po-susta Via-Ramna' },
];

const SECONDARY_FIELDS: TraineeField[] = [
  { label: 'Shift', value: '1', tabular: true },
  { label: 'Unit', value: '2', tabular: true },
  { label: 'Training Duration', value: '--' },
  { label: 'Certified', value: 'Yes' },
  { label: 'Certificate issue date', value: '06-Nov-2025', tabular: true },
];

type ModalType = 'result' | 'nims' | 'login' | 'exam' | null;

export default function App() {
  const [bookmarked, setBookmarked] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [forceTwoCol, setForceTwoCol] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginFeedback, setLoginFeedback] = useState('');

  const handleCopyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://dgt.skillindiadigital.gov.in/ncv').catch(() => {});
    }
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 1800);
  };

  const handlePrint = () => {
    setSettingsOpen(false);
    window.print();
  };

  const handleResetScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
    setSettingsOpen(false);
    setActiveModal(null);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId.trim() || !loginPassword.trim()) {
      setLoginFeedback('Please enter both User ID and Password.');
      return;
    }
    setLoginFeedback('Portal authentication is available on the official Skill India Digital gateway.');
  };

  const renderFieldList = (fields: TraineeField[]) => {
    const gridClasses = forceTwoCol
      ? 'grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3.5'
      : 'grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-x-8 sm:gap-y-3.5';

    const itemClasses = forceTwoCol
      ? 'grid grid-cols-1 min-[480px]:grid-cols-[120px_1fr] sm:grid-cols-[136px_1fr] gap-x-2 items-baseline'
      : 'flex flex-col sm:grid sm:grid-cols-[136px_1fr] sm:gap-x-2 sm:items-baseline';

    return (
      <div className={gridClasses}>
        {fields.map((field) => (
          <div key={field.label} className={itemClasses}>
            <dt className="text-[13.5px] sm:text-[13px] font-semibold text-[#111827] leading-[1.4]">
              {field.label}
            </dt>
            <dd
              className={`text-[13.5px] sm:text-[13px] font-normal text-[#6b7280] leading-[1.45] mt-0.5 sm:mt-0 break-words ${
                field.tabular ? 'tabular-nums' : ''
              }`}
            >
              {field.value}
            </dd>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#1f2937] flex flex-col">
      {/* 1. Top Browser / Address Bar */}
      <div className="no-print sticky top-0 z-40 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 h-[52px] flex items-center gap-2.5 sm:gap-3.5">
          <button
            type="button"
            onClick={handleResetScroll}
            aria-label="Portal home"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#3c4043] hover:bg-[#f1f3f4] transition-colors shrink-0 cursor-pointer"
          >
            <Home className="w-[19px] h-[19px]" strokeWidth={1.9} />
          </button>

          <div className="flex-1 min-w-0 bg-[#f1f3f4] rounded-full px-4 py-2 flex items-center justify-between gap-2">
            <span className="text-[13.5px] sm:text-[14.5px] truncate select-all">
              <span className="text-[#202124] font-normal">dgt.skillindiadigital.gov.in</span>
              <span className="text-[#5f6368]">/ncv</span>
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0 relative">
            <button
              type="button"
              onClick={() => setBookmarked((prev) => !prev)}
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark page'}
              title={bookmarked ? 'Bookmarked' : 'Bookmark URL'}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#3c4043] hover:bg-[#f1f3f4] transition-colors cursor-pointer"
            >
              <Star
                className={`w-[19px] h-[19px] transition-colors ${
                  bookmarked ? 'fill-[#f2711c] text-[#f2711c]' : 'text-[#3c4043]'
                }`}
                strokeWidth={1.85}
              />
            </button>

            <button
              type="button"
              onClick={() => setSettingsOpen((prev) => !prev)}
              aria-label="Browser settings"
              aria-expanded={settingsOpen}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#3c4043] hover:bg-[#f1f3f4] transition-colors cursor-pointer"
            >
              <Settings className="w-[19px] h-[19px]" strokeWidth={1.85} />
            </button>

            {settingsOpen && (
              <div
                role="menu"
                className="absolute right-0 top-11 w-60 bg-white rounded-xl border border-[#e5e7eb] shadow-lg py-1.5 z-50 text-[13px]"
              >
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2.5 text-[#374151] hover:bg-[#f8fafc] cursor-pointer"
                >
                  {copiedUrl ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#6b7280] shrink-0" />
                  )}
                  <span>{copiedUrl ? 'Copied portal URL' : 'Copy portal URL'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForceTwoCol((prev) => !prev);
                    setSettingsOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-left flex items-center justify-between text-[#374151] hover:bg-[#f8fafc] cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <LayoutGrid className="w-4 h-4 text-[#6b7280] shrink-0" />
                    <span>2-Column Grid Mode</span>
                  </span>
                  <span className="text-[11px] font-semibold text-[#f2711c]">
                    {forceTwoCol ? 'ON' : 'AUTO'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2.5 text-[#374151] hover:bg-[#f8fafc] cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#6b7280] shrink-0" />
                  <span>Print Trainee Details</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Official Skill India Digital / NCVT Header */}
      <header className="no-print bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 py-2.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
          {/* Left: Menu + Official Logos */}
          <div className="flex items-center gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="w-9 h-9 -ml-1 rounded-md flex items-center justify-center text-[#374151] hover:bg-[#f3f4f6] shrink-0 cursor-pointer"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* 1. Ministry of Skill Development and Entrepreneurship Logo */}
            <div className="flex items-center shrink-0 pr-2 border-r border-[#e5e7eb]">
              <img
                src="/assets/aistudio/Screenshot_2026-11-18-09-06-27-61_40deb401b9ffe8e1df2f1cc5ba480b12_f14bec15.jpg"
                alt="Ministry of Skill Development and Entrepreneurship"
                referrerPolicy="no-referrer"
                className="h-[34px] sm:h-[40px] w-auto object-contain mix-blend-multiply"
              />
            </div>

            {/* 2. Directorate General of Training (DGT) Gear-Wheel Logo */}
            <div className="flex items-center shrink-0 pr-2 border-r border-[#e5e7eb]">
              <div className="h-[36px] sm:h-[42px] overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-18-09-07-01-00_40deb401b9ffe8e1df2f1cc5ba480b12_b363248b.jpg"
                  alt="Directorate General of Training"
                  referrerPolicy="no-referrer"
                  className="h-[46px] sm:h-[52px] w-auto object-contain -mt-2 mix-blend-multiply"
                />
              </div>
            </div>

            {/* 3. Skill India Logo */}
            <div className="flex items-center shrink-0 pr-2 border-r border-[#e5e7eb]">
              <div className="h-[34px] sm:h-[40px] overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-18-09-06-47-95_40deb401b9ffe8e1df2f1cc5ba480b12_8ac3b94d.jpg"
                  alt="Skill India - कौशल भारत कुशल भारत"
                  referrerPolicy="no-referrer"
                  className="h-[46px] sm:h-[54px] w-auto object-contain -mt-2.5 mix-blend-multiply"
                />
              </div>
            </div>

            {/* 4. ITI Logo */}
            <div className="flex items-center shrink-0">
              <div className="h-[32px] sm:h-[36px] w-[52px] sm:w-[60px] overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-18-09-07-12-25_40deb401b9ffe8e1df2f1cc5ba480b12_61dfb55d.jpg"
                  alt="ITI Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain scale-[1.2] -translate-y-0.5 mix-blend-multiply"
                />
              </div>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
            <button
              type="button"
              onClick={() => setActiveModal('result')}
              className="px-4 py-2 rounded-lg bg-[#fdf5ee] hover:bg-[#fae8d8] text-[#b85d19] border border-[#f0c59e] text-[11px] sm:text-[12px] font-medium uppercase tracking-wide whitespace-nowrap transition-colors cursor-pointer"
            >
              RESULT
            </button>

            <button
              type="button"
              onClick={() => setActiveModal('nims')}
              className="px-3.5 py-1.5 sm:py-2 rounded-lg bg-[#fdf5ee] hover:bg-[#fae8d8] text-[#b85d19] border border-[#f0c59e] text-[11px] sm:text-[12px] font-medium leading-[1.2] text-center max-w-[175px] sm:max-w-none sm:whitespace-nowrap transition-colors cursor-pointer"
            >
              Instructor self registration on NIMS
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginFeedback('');
                setActiveModal('login');
              }}
              className="px-5 py-2 rounded-lg bg-[#f2711c] hover:bg-[#df6110] text-white text-[11px] sm:text-[12px] font-semibold uppercase tracking-wide whitespace-nowrap transition-colors shadow-xs cursor-pointer"
            >
              LOGIN
            </button>
          </div>
        </div>

        {/* Collapsible Mobile / Hamburger Portal Navigation */}
        {menuOpen && (
          <nav
            aria-label="Portal Navigation"
            className="border-t border-[#e5e7eb] bg-[#fafafa] px-4 py-3"
          >
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-4 gap-2 text-[13px] font-medium text-[#374151]">
              <button
                type="button"
                onClick={handleResetScroll}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-[#e5e7eb] hover:border-[#f2711c] text-left cursor-pointer"
              >
                <span>Trainee Verification</span>
                <ChevronRight className="w-4 h-4 text-[#9ca3af]" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setActiveModal('result');
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-[#e5e7eb] hover:border-[#f2711c] text-left cursor-pointer"
              >
                <span>NCVT Result Lookup</span>
                <ChevronRight className="w-4 h-4 text-[#9ca3af]" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setActiveModal('nims');
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-[#e5e7eb] hover:border-[#f2711c] text-left cursor-pointer"
              >
                <span>NIMS Instructor Portal</span>
                <ChevronRight className="w-4 h-4 text-[#9ca3af]" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setActiveModal('exam');
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-[#e5e7eb] hover:border-[#f2711c] text-left cursor-pointer"
              >
                <span>CTS AITT Mains Notices</span>
                <ChevronRight className="w-4 h-4 text-[#9ca3af]" />
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* 3. Thin Alert / Banner Strip right below the header */}
      <div className="no-print bg-white border-b border-[#e5e7eb] py-1.5 px-4">
        <div className="max-w-[1440px] mx-auto flex justify-end sm:justify-center">
          <button
            type="button"
            onClick={() => setActiveModal('exam')}
            className="text-[#e05a00] hover:text-[#c2410c] hover:underline text-[12px] sm:text-[13px] font-bold tracking-[-0.01em] truncate cursor-pointer"
          >
            Click here to view CTS AITT Mains Exam...
          </button>
        </div>
      </div>

      {/* 4. Main Content Area (Trainee Details Card) */}
      <main className="flex-1 px-3 sm:px-6 py-4 sm:py-7">
        <section
          aria-labelledby="trainee-details-heading"
          className="max-w-[780px] mx-auto bg-white rounded-[10px] border border-[#e5e7eb] shadow-[0_2px_10px_rgba(15,23,42,0.06)] overflow-hidden"
        >
          {/* Card Header */}
          <div className="px-5 sm:px-7 py-4 border-b border-[#e5e7eb]">
            <h1
              id="trainee-details-heading"
              className="text-[18px] sm:text-[20px] font-medium text-[#1e293b] tracking-[-0.01em]"
            >
              Trainee Details
            </h1>
          </div>

          {/* Card Body */}
          <div className="px-5 sm:px-10 pt-7 pb-9 sm:pb-11">
            {/* Circular Profile Photo with Orange Border */}
            <div className="flex justify-center mb-7 sm:mb-9">
              <div className="w-[88px] h-[88px] sm:w-[92px] sm:h-[92px] rounded-full border-[2.5px] border-[#f2711c] p-[3px] bg-white shadow-xs">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#d8dbe0] flex items-center justify-center">
                  <img
                    src="/assets/aistudio/IMG_20261118_092418_809fa23b.jpg"
                    alt="Trainee profile photo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center scale-[1.08]"
                  />
                </div>
              </div>
            </div>

            {/* Trainee Details Grid */}
            <dl>
              {renderFieldList(PRIMARY_FIELDS)}
              <div className="mt-4 sm:mt-6">{renderFieldList(SECONDARY_FIELDS)}</div>
            </dl>
          </div>
        </section>
      </main>

      {/* Interactive Modal for Header Actions & Banner */}
      {activeModal && (
        <div
          className="no-print fixed inset-0 z-50 bg-black/45 backdrop-blur-[1px] flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md bg-white rounded-xl border border-[#e5e7eb] shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 border-b border-[#e5e7eb] flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-[#111827]">
                {activeModal === 'result' && 'CTS / NCVT Result Verification'}
                {activeModal === 'nims' && 'Instructor Self Registration on NIMS'}
                {activeModal === 'login' && 'Skill India Digital — Portal Login'}
                {activeModal === 'exam' && 'CTS AITT Mains Examination Notice'}
              </h2>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#6b7280] hover:bg-[#f3f4f6] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 text-[13.5px] text-[#4b5563] space-y-3">
              {activeModal === 'result' && (
                <>
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#fdf5ee] border border-[#f0c59e] text-[#9a460b]">
                    <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Trainee Record Verified</p>
                      <p className="text-[12.5px] mt-0.5">
                        Roll No <span className="font-semibold tabular-nums">R150810233736</span> — Certified on{' '}
                        <span className="font-semibold tabular-nums">06-Nov-2025</span>.
                      </p>
                    </div>
                  </div>
                  <p>
                    Trade: <strong className="text-[#111827]">Electrician (231)</strong> · Admission Year:{' '}
                    <strong className="text-[#111827] tabular-nums">2023</strong>.
                  </p>
                </>
              )}

              {activeModal === 'nims' && (
                <>
                  <p>
                    Instructors affiliated with NCVT-approved ITIs can complete self-registration on the National
                    Instructional Media Institute / NIMS portal using ITI Code{' '}
                    <strong className="text-[#111827] tabular-nums">PR10000718</strong>.
                  </p>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#f2711c] hover:underline cursor-pointer"
                    >
                      <span>Return to Trainee Details</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}

              {activeModal === 'exam' && (
                <>
                  <p className="font-semibold text-[#111827]">
                    Craftsmen Training Scheme (CTS) — AITT Mains Examination Schedule
                  </p>
                  <p>
                    Trainees appearing under DGT / NCVT MIS can verify their admit card, practical schedule, and
                    CBT center details through their respective ITI login.
                  </p>
                </>
              )}

              {activeModal === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="portal-userid" className="block text-[12.5px] font-semibold text-[#111827] mb-1">
                      User ID / Roll Number
                    </label>
                    <input
                      id="portal-userid"
                      type="text"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      placeholder="Enter User ID or Roll No"
                      className="w-full px-3 py-2 rounded-lg border border-[#d1d5db] text-[13px] focus:outline-none focus:border-[#f2711c]"
                    />
                  </div>
                  <div>
                    <label htmlFor="portal-pass" className="block text-[12.5px] font-semibold text-[#111827] mb-1">
                      Password
                    </label>
                    <input
                      id="portal-pass"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter Password"
                      className="w-full px-3 py-2 rounded-lg border border-[#d1d5db] text-[13px] focus:outline-none focus:border-[#f2711c]"
                    />
                  </div>
                  {loginFeedback && (
                    <p className="text-[12.5px] text-[#b85d19] bg-[#fdf5ee] border border-[#f0c59e] rounded-lg px-3 py-2">
                      {loginFeedback}
                    </p>
                  )}
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2 rounded-lg border border-[#d1d5db] text-[#374151] text-[12.5px] font-medium hover:bg-[#f9fafb] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#f2711c] hover:bg-[#df6110] text-white text-[12.5px] font-semibold cursor-pointer"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
