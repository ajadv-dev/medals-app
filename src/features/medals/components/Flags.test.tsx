import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { Flag } from '@/features/medals/components/Flags';
import { countryCodes, FLAG_HEIGHT } from '@/features/medals/consts';

vi.mock('@/api/consts', () => ({
    flagsPngUrl: '/medals-app/flags.png',
}));

describe('<Flag />', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correct background for country code', () => {
        const sortedCountryCodes = [...countryCodes].sort((a, b) => a.localeCompare(b));
        const code = 'FRA';
        const index = sortedCountryCodes.indexOf(code.toUpperCase());
        const expectedYOffset = -index * FLAG_HEIGHT;

        const { container } = render(<Flag code={code} />);
        const div = container.firstChild as HTMLDivElement;

        expect(div).toHaveAttribute('aria-label', `Flag of ${code}`);
        expect(div).toHaveStyle({
            backgroundImage: 'url(/medals-app/flags.png)',
            backgroundPosition: `0px ${expectedYOffset}px`,
        });
    });

    it('handles lowercase input code', () => {
        const sortedCountryCodes = [...countryCodes].sort((a, b) => a.localeCompare(b));
        const code = 'fra';
        const index = sortedCountryCodes.indexOf(code.toUpperCase());
        const expectedYOffset = -index * FLAG_HEIGHT;

        const { getByLabelText } = render(<Flag code={code} />);
        const div = getByLabelText(`Flag of ${code}`) as HTMLDivElement;

        expect(div).toHaveStyle({
            backgroundImage: 'url(/medals-app/flags.png)',
            backgroundPosition: `0px ${expectedYOffset}px`,
        });
    });

    it('applies styles.flag class', () => {
        const { container } = render(<Flag code="FRA" />);
        const div = container.firstChild as HTMLDivElement;
        expect(div.className).toContain('flag');
    });

    it('yOffset is 0 for first country in sorted list', () => {
        const sortedCountryCodes = [...countryCodes].sort((a, b) => a.localeCompare(b));
        const firstCode = sortedCountryCodes[0];

        const { container } = render(<Flag code={firstCode} />);
        const div = container.firstChild as HTMLDivElement;

        expect(div).toHaveStyle({ backgroundPosition: '0px 0px' });
    });
});
