import React, { useState } from 'react';
import { AppHeader } from '../components/layout/AppHeader';
import { BottomNav } from '../components/layout/BottomNav';
import { Badge } from '../components/ui/Badge';
import { formatCurrency } from '../utils/formatCurrency';
import './WalletPage.css';

const TRANSACTIONS = [
  { id: 1, name: 'Apple iPhone 17', date: 'Sep 3, 2026', amount: -14983, type: 'emi', months: '2/6' },
  { id: 2, name: 'EMI Repayment', date: 'Aug 3, 2026', amount: 14983, type: 'repay', months: null },
  { id: 3, name: 'Royal Enfield Classic 350', date: 'Jul 20, 2026', amount: -32833, type: 'emi', months: '1/6' },
  { id: 4, name: 'EMI Repayment', date: 'Jul 3, 2026', amount: 14983, type: 'repay', months: null },
  { id: 5, name: 'Sony WH-1000XM6', date: 'Jun 15, 2026', amount: -5832, type: 'emi', months: '1/6' },
];

const PLEDGED_FUNDS = [
  { name: 'Axis Bluechip Fund', folio: 'AXIS-2839', units: 312.45, value: 250000 },
  { name: 'Mirae Asset Large Cap', folio: 'MIR-9021', units: 541.12, value: 300000 },
  { name: 'HDFC Mid-Cap Fund', folio: 'HDFC-4420', units: 189.30, value: 200000 },
];

export const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'funds'>('transactions');

  const totalLimit = 750000;
  const outstanding = 256000;
  const available = totalLimit - outstanding;

  return (
    <div className="wallet-page">
      <AppHeader title="Wallet" rightSlot={
        <button className="wallet-header-btn" id="wallet-statements-btn">Statements</button>
      } />

      <div className="wallet-page__scroll">
        {/* Balance Card */}
        <div className="wallet-balance-card">
          <div className="wallet-balance-card__top">
            <div>
              <p className="wallet-balance-card__label">Balance Available</p>
              <p className="wallet-balance-card__amount">{formatCurrency(available)}</p>
            </div>
            <div className="wallet-balance-card__badge">
              <Badge variant="success">Active</Badge>
            </div>
          </div>

          <div className="wallet-balance-card__stats">
            <div className="wallet-balance-card__stat">
              <p className="wallet-balance-card__stat-label">Outstanding in EMIs</p>
              <p className="wallet-balance-card__stat-value">{formatCurrency(outstanding)}</p>
            </div>
            <div className="wallet-balance-card__divider" />
            <div className="wallet-balance-card__stat">
              <p className="wallet-balance-card__stat-label">Overall Credit Limit</p>
              <p className="wallet-balance-card__stat-value">{formatCurrency(totalLimit)}</p>
            </div>
          </div>

          {/* Usage bar */}
          <div className="wallet-usage-bar">
            <div
              className="wallet-usage-bar__fill"
              style={{ width: `${(outstanding / totalLimit) * 100}%` }}
            />
          </div>
          <p className="wallet-usage-bar__label">
            {((outstanding / totalLimit) * 100).toFixed(0)}% of limit used
          </p>

          {/* Action buttons */}
          <div className="wallet-actions">
            <button id="wallet-withdraw-btn" className="wallet-action-btn wallet-action-btn--primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              Withdraw
            </button>
            <button id="wallet-repay-btn" className="wallet-action-btn wallet-action-btn--secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
              Repay
            </button>
          </div>
        </div>

        {/* Info callout */}
        <div className="wallet-info-callout">
          <span className="wallet-info-callout__icon">📈</span>
          <div>
            <p className="wallet-info-callout__title">Your investments keep growing</p>
            <p className="wallet-info-callout__sub">Pledged mutual funds continue earning returns while you shop at 0% interest.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="wallet-tabs">
          <button
            id="wallet-tab-transactions"
            className={`wallet-tab ${activeTab === 'transactions' ? 'wallet-tab--active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button
            id="wallet-tab-funds"
            className={`wallet-tab ${activeTab === 'funds' ? 'wallet-tab--active' : ''}`}
            onClick={() => setActiveTab('funds')}
          >
            Pledged Funds
          </button>
        </div>

        {/* Transactions */}
        {activeTab === 'transactions' && (
          <div className="wallet-transactions">
            {TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="wallet-tx">
                <div className={`wallet-tx__icon ${tx.type === 'repay' ? 'wallet-tx__icon--green' : 'wallet-tx__icon--purple'}`}>
                  {tx.type === 'emi'
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  }
                </div>
                <div className="wallet-tx__info">
                  <p className="wallet-tx__name">{tx.name}</p>
                  <p className="wallet-tx__meta">
                    {tx.date}
                    {tx.months && <span className="wallet-tx__badge">EMI {tx.months}</span>}
                  </p>
                </div>
                <p className={`wallet-tx__amount ${tx.amount > 0 ? 'wallet-tx__amount--credit' : ''}`}>
                  {tx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount))}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Pledged Funds */}
        {activeTab === 'funds' && (
          <div className="wallet-funds">
            <p className="wallet-funds__total-label">Total Pledged Value</p>
            <p className="wallet-funds__total">{formatCurrency(750000)}</p>
            {PLEDGED_FUNDS.map((fund, i) => (
              <div key={i} className="wallet-fund-card">
                <div className="wallet-fund-card__icon">MF</div>
                <div className="wallet-fund-card__info">
                  <p className="wallet-fund-card__name">{fund.name}</p>
                  <p className="wallet-fund-card__folio">Folio: {fund.folio} · {fund.units} units</p>
                </div>
                <p className="wallet-fund-card__value">{formatCurrency(fund.value)}</p>
              </div>
            ))}
            <button id="view-portfolio-btn" className="wallet-view-portfolio-btn">
              View Full Portfolio
            </button>
          </div>
        )}

        <div style={{ height: '16px' }} />
      </div>

      <BottomNav />
    </div>
  );
};
