"""add_email_and_reset_token_to_admin

Revision ID: 2eb194357a29
Revises: 8c86d4d4cbb3
Create Date: 2025-05-29 06:52:36.247311

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2eb194357a29'
down_revision: Union[str, None] = '8c86d4d4cbb3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
